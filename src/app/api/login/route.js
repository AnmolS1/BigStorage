import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import url from 'url';

export async function GET(request) {
	try {
		const client = new DynamoDBClient({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY
			}
		});
		
		const username = url.parse(request.url, true).query.username;
		const command = new GetItemCommand({
			TableName: process.env.AWS_DYNAMODB_TABLENAME,
			Key: { username: { S: username } }
		});
		const response = await client.send(command);
		
		if (response.Item) {
			return new Response(JSON.stringify(response.Item));
		} else {
			return new Response(JSON.stringify({ notFound: true }), { status: 200 });
		}
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}
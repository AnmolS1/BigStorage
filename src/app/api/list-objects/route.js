import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function POST(request) {
	const { username } = await request.json();
	
	try {
		const client = new S3Client({
			region: process.env.region,
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
			}
		});
		
		const params = {
			Bucket: process.env.AWS_S3_BUCKETNAME,
			Prefix: username
		};
		const command = new ListObjectsV2Command(params);
		const response = await client.send(command);
		
		// console.log(response);
		// const temp_response = { Contents: [{ Key: 'a/sdfasf.txt', ETag: 'asdfadsf', Size: 1 }] };
		
		return Response.json(response);
	} catch (error) {
		console.error(error);
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}
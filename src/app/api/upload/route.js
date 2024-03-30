import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'

export async function POST(request) {
	const { filename } = await request.json();
	
	try {
		const client = new S3Client({
			region: process.env.region,
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
			}
		});
		
		const { url, fields } = await createPresignedPost(client, {
			Bucket: process.env.AWS_S3_BUCKETNAME,
			Key: filename,
			Expires: 600
		});
		
		return Response.json({ url, fields });
	} catch (error) {
		console.error(error);
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}
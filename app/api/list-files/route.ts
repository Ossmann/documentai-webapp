import { NextResponse } from 'next/server';
import s3 from '@/app/components/aws_config';

export async function GET() {
    const params = {
        Bucket: 'my-pdf-processing-ai-bucket',
        Prefix: 'processed-data/', // Folder path
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const files = data.Contents?.map(item => ({
            key: item.Key,
            url: s3.getSignedUrl('getObject', {
                Bucket: 'my-pdf-processing-ai-bucket',
                Key: item.Key,
                Expires: 60 * 5, // URL expiration time in seconds
            }),
        }));

        return NextResponse.json({ files });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
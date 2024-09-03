import { NextResponse } from 'next/server';
import s3 from '@/app/components/aws_config';

export async function GET() {
    const params = {
        Bucket: 'my-pdf-processing-ai-bucket',
        Prefix: 'processed-data/', // Folder path
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        if (!data.Contents || data.Contents.length === 0) {
            console.log('No files found in the specified folder.');
            return NextResponse.json({ files: [] });
        }

        const files = data.Contents.map(item => ({
            key: item.Key,
            url: `https://${params.Bucket}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${item.Key}`
        }));

        console.log('Files found:', files); // Debug log for the response
        return NextResponse.json({ files });
    } catch (error) {
        console.error('Error listing files:', error); // Log the error
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
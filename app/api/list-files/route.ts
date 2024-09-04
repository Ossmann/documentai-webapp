import { NextResponse } from 'next/server';
import s3 from '@/app/components/aws_config';

export async function GET() {
    const params = {
        Bucket: 'my-pdf-processing-ai-bucket',
        Prefix: 'processed-data/', // Folder path
    };

    try {
        const data = await s3.listObjectsV2(params).promise();

        // Log the full response from S3 for debugging purposes
        console.log('S3 response data:', JSON.stringify(data, null, 2));        

        if (!data.Contents || data.Contents.length === 0) {
            console.log('No files found in the specified folder.');
            return NextResponse.json({ files: [] }, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            });
        }

        const files = data.Contents.map(item => ({
            key: item.Key,
            url: `https://${params.Bucket}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${item.Key}`
        }));

        console.log('Files found:', files);

        console.log('Files found:', files); // Debug log for the response
        return NextResponse.json({ files }, {
            headers: {
                'Cache-Control': 'no-store',
            }
        });
    } catch (error) {
        console.error('Error listing files:', error); // Log the error
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
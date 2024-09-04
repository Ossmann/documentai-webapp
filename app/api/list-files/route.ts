import { NextResponse } from 'next/server';
import s3 from '@/app/components/aws_config';

export async function GET() {
    const params = {
        Bucket: 'my-pdf-processing-ai-bucket',
        Prefix: 'processed-data/',
    };

    try {
        // Fetch the list of objects from the S3 bucket
        const data = await s3.listObjectsV2(params).promise();

        // Check if no files are found and return an empty array with cache-control headers
        if (!data.Contents || data.Contents.length === 0) {
            console.log('No files found in the specified folder.');
            return NextResponse.json({ files: [] }, {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, stale-while-revalidate=0',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
        }

        // Map the list of files from the S3 response
        const files = data.Contents.map(item => ({
            key: item.Key,
            url: `https://${params.Bucket}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${item.Key}`
        }));

        // Return the files with appropriate cache-control headers
        return NextResponse.json({ files }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, stale-while-revalidate=0',
                'Pragma': 'no-cache',
                'Expires': '0'
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
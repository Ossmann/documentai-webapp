import { NextResponse } from 'next/server';
import s3 from '@/app/components/aws_config';

export async function GET() {
    const params = {
        Bucket: 'my-pdf-processing-ai-bucket',
        Prefix: 'processed-data/',
    };

    try {
        const data = await s3.listObjectsV2(params).promise();

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

        const files = await Promise.all(data.Contents.map(async (item) => {
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
                Bucket: params.Bucket,
                Key: item.Key,
                Expires: 60 * 5 // URL valid for 5 minutes
            });

            return {
                key: item.Key,
                url: signedUrl // Use the signed URL instead of the direct URL
            };
        }));

        return NextResponse.json({ files }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, stale-while-revalidate=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error('Error listing files:', error);
        return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
    }
}
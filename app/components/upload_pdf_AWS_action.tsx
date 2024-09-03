'use server';

import AWS from 'aws-sdk';
import { z } from 'zod';

const S3_BUCKET = 'my-pdf-processing-ai-bucket';
const REGION = process.env.AWS_DEFAULT_REGION;

// Configure the AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

// Define the schema using Zod
const FormSchema = z.object({
  fileInput: z.any(),
});

export async function uploadPDFtoAWS(formData: FormData) {
  const parsedData = FormSchema.safeParse({
    fileInput: formData.get('fileInput'),
  });

  if (!parsedData.success) {
    throw new Error('Invalid file input');
  }

  const file = parsedData.data.fileInput as Blob;

  // Convert Blob to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = (file as any).name; // Extract the file name from the Blob
  const fileType = (file as any).type; // Extract the file type from the Blob

  const params = {
    Bucket: S3_BUCKET,
    Key: `uploads/${fileName}`,
    Body: buffer,  // Use the buffer instead of the blob
    ContentType: fileType,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('File upload failed:', error);
      throw new Error(`File upload failed: ${error.message}`);
    } else {
      console.error('File upload failed:', error);
      throw new Error('File upload failed due to an unknown error');
    }
  }
}
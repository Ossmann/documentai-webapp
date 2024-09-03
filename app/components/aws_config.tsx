import AWS from 'aws-sdk';

// Configure the AWS SDK
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

export default s3;
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

let s3Bucket = new AWS.S3({
  accessKeyId: process.env.S3_PUBLIC,
  secretAccessKey: process.env.S3_PRIVATE,
  Bucket: process.env.S3_BUCKET,
});

const uploadTos3 = async file => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${uuidv4()}.mp3`,
    Body: file,
    ContentType: 'audo/mpeg',
  };

  await s3Bucket.upload(params).promise();
  return `https://s3.amazonaws.com/${process.env.S3_BUCKET}/${params.Key}`;
};

module.exports = {
  uploadTos3,
};


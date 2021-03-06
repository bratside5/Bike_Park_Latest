require("dotenv").config();

module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
      region: process.env.AWS_REGION,
      params: {
        Bucket: process.env.BUCKET_NAME,
      },
    },
  },
});

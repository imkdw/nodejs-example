import dotenv from "dotenv";
dotenv.config();

export const database = {
  host: process.env.DATABASE_HOST as string,
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
};

export const aws = {
  iam: {
    accessKeyId: process.env.IAM_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY as string,
    region: process.env.IAM_REGION as string,
  },
  bucket: {
    name: process.env.BUCKET_NAME as string,
  },
};

export const slack = {
  token: process.env.SLACK_APP_TOKEN as string,
  logging: process.env.SLACK_CHANNEL_LOGGING as string,
};

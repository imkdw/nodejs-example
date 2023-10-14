import * as config from "../config/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const uploadToS3 = async (bucketName: string, key: string, body: string | null) => {
  const { accessKeyId, region, secretAccessKey } = config.aws.iam;

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body || "no data",
  });

  try {
    await s3Client.send(command);
  } catch (err: any) {
    throw new Error(err);
  }
};

import * as config from "../config/config";

const validateConfig = (env: { [key: string]: string }): boolean => {
  for (const [key, value] of Object.entries(config.database)) {
    if (!value) return false;
  }
  return true;
};

export const validateEnv = () => {
  if (!validateConfig(config.database)) throw new Error("Database config is not valid");
  if (!validateConfig(config.aws.iam)) throw new Error("AWS IAM config is not valid");
  if (!validateConfig(config.aws.bucket)) throw new Error("AWS Bucket config is not valid");
  if (!validateConfig(config.slack)) throw new Error("AWS Slack config is not valid");
};

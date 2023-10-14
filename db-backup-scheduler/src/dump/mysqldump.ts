import mysqldump, { DumpReturn } from "mysqldump";
import * as config from "../config/config";
import { DateFormatType, getDate } from "../utils/date";
import { uploadToS3 } from "../aws/s3";

/**
 * 덤프 생성
 * @returns {DumpReturn} 덤프 데이터 반환
 */
export const createDump = async (): Promise<DumpReturn> => {
  const { database, host, password, user } = config.database;

  const dump = await mysqldump({
    connection: {
      database,
      host,
      password,
      user,
    },
  });

  return dump;
};

/**
 * 덤프 스토리지 업로드
 * @param dump 덤프데이터
 */
export const uploadDump = async (dump: DumpReturn) => {
  const { data, schema, trigger } = dump.dump;
  const { name } = config.aws.bucket;

  const uploadDate = getDate(DateFormatType.YYYYMMDDHH);
  const folderName = `${getDate(DateFormatType.YYYYMMDD)}`;

  try {
    const dataName = `${folderName}/${uploadDate}/${uploadDate}-data.sql`;
    await uploadToS3(name, dataName, data);

    const schemaName = `${folderName}/${uploadDate}/${uploadDate}-schema.sql`;
    await uploadToS3(name, schemaName, schema);

    const triggerName = `${folderName}/${uploadDate}/${uploadDate}-trigger.sql`;
    await uploadToS3(name, triggerName, trigger);
  } catch (err: any) {
    throw new Error(err);
  }
};

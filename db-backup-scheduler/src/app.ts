import { scheduleJob } from "node-schedule";
import { validateEnv } from "./utils/validation";
import { createDump, uploadDump } from "./dump/mysqldump";
import { sendMessage } from "./slack/slack";
import { DateFormatType, getDate } from "./utils/date";

const processDump = async () => {
  validateEnv();

  const now = getDate(DateFormatType.YYYYMMDDHH_COLON);

  try {
    const dump = await createDump();
    await uploadDump(dump);
    await sendMessage(`✔ [${now + ":00"}] 데이터베이스 덤프 생성 성공`);
  } catch (err: any) {
    await sendMessage(`❌ [${now + ":00"}] 데이터베이스 덤프 생성 실패, ${err.message}`);
    throw new Error(err);
  }
};

scheduleJob("0 * * * *", processDump);

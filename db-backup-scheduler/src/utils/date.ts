export enum DateFormatType {
  YYYYMMDDHH = "yyyymmddhh",
  YYYYMMDDHH_COLON = "yyyymmddcolon",
  YYYYMMDD = "yyyymmdd",
}

const createDate = (now: Date) => {
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");

  return { year, month, day, hours };
};

export const getDate = (format: DateFormatType) => {
  const now = new Date();

  if (format === DateFormatType.YYYYMMDDHH) {
    const { year, month, day, hours } = createDate(now);
    return `${year}${month}${day}${hours}`;
  }

  if (format === DateFormatType.YYYYMMDD) {
    const { year, month, day } = createDate(now);
    return `${year}${month}${day}`;
  }

  if (format === DateFormatType.YYYYMMDDHH_COLON) {
    const { year, month, day, hours } = createDate(now);
    return `${year}-${month}-${day} ${hours}`;
  }
};

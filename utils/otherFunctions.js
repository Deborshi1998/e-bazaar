import dayjs from "dayjs";

export const timeStampToDate = (timestamp) => {
  return dayjs(timestamp.seconds * 1000).toString();
};

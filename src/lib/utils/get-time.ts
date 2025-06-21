import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTime = (time: Date): string => {
  return dayjs(time).fromNow().toString();
};

export const getNow = () => {
  return dayjs(new Date().toLocaleString()).format("MM/DD/YYYY h:mm A");
};

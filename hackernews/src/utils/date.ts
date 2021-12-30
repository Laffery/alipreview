import { plural } from "./plural";
export const ago = (time?: number): string => {
  if (!time) return "";
  const a = new Date().getTime() - 1e3 * time;
  const minute = Math.floor(a / (1e3 * 60));
  if (minute < 60) return `${minute} minute${plural(minute)} ago`;
  const hour = Math.floor(minute / 60);
  if (hour < 24) return `${hour} hour${plural(hour)} ago`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} day${plural(day)} ago`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} month${plural(month)} ago`;
  return "";
};

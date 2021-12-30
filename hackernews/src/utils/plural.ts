export const plural = (num: number, suffix?: string) => {
  return num > 1 ? suffix ?? "s" : "";
};

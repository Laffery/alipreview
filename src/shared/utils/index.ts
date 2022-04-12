/**
 * @param num 给定数字
 * @param suffix 默认复数添加后缀`s`
 * @returns 如果数字是复数，则添加后缀
 */
export const plural = (num: number, suffix?: string) => {
  return num > 1 ? suffix ?? "s" : "";
};

/**
 * @param time 时间戳
 * @returns 该时间戳距离此时多久
 */
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

/**
 * @param url news的链接地址
 * @returns 在from site的地址
 */
export const host = (url: string) => {
  const { hostname, pathname } = new URL(url);

  /**  去掉某些二级域名 */
  const host = hostname.replace(/(www\.)|(andreas\.)|(bastian\.)/, "");

  /**  github要展示用户名 */
  if (host === "github.com") return `${host}/${pathname.split("/")[1]}`;
  return host;
};

/**
 * 获取相对根路径的路由
 */
export const relRootPath = (path: string) => {
  if (path.startsWith("/")) return path;
  return `/${path}`;
};

export enum Status {
  Success = "Success",
  Failed = "Failed",
  Pending = "Pending",
  Error = "Error",
}

/** 获取Cookie */
export function getCookie(
  cookie: string | undefined,
  name: string | undefined
): string {
  if (!cookie) return "";
  if (!name) return cookie;

  let start = cookie.indexOf(`${name}=`);
  if (start !== -1) {
    start = start + name.length + 1;
    let end = cookie.indexOf(";", start);
    if (end === -1) end = cookie.length;
    return decodeURI(cookie.substring(start, end));
  }

  return "";
}

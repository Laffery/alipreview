import type { Account } from "hackernews";

/** According to https://github.com/HackerNews/API, the api's url is */
export const baseUrl = "https://hacker-news.firebaseio.com";

/** integrated server apis' base url */
export const apiUrl = "http://localhost:3000/api";

/** hackernews official site url */
export const hackUrl = "https://news.ycombinator.com";

/** mock account */
export const account: Account = {
  username: "ali-preview",
  password: "hackernews",
};

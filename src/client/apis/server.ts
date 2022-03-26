import { Account, Story } from "hackernews";
import { Status } from "@/utils/index";
import { baseUrl, account as mockAccount } from "config";
import fetch from "node-fetch";

/**
 * 根据id获取news信息
 * @param id news id
 * @returns news meta data
 */
export async function getStoryById(id: number): Promise<Story> {
  const res = await fetch(`${baseUrl}/v0/item/${id}.json`);
  return res.json();
}

/**
 * 获取排行榜靠前的news id
 */
export async function getTopStories(): Promise<Story[]> {
  const res = await fetch(`${baseUrl}/v0/topstories.json`);
  const tops = (await res.json()) as number[];
  return await Promise.all(tops.slice(0, 30).map((id) => getStoryById(id)));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cvtAccount2FormData = (account: Account): string => {
  const formData = [
    encodeURIComponent("acct") + "=" + encodeURIComponent(account.username),
    encodeURIComponent("pw") + "=" + encodeURIComponent(account.password),
  ];
  return formData.join("&");
};

/**
 * 登录
 */
export async function login(account: Account): Promise<string> {
  if (
    account.username !== mockAccount.username ||
    account.password !== mockAccount.password
  )
    return "Bad Login.";

  return Status.Success;
}

/**
 * 新建账户接口
 */
export async function register(account: Account): Promise<string> {
  const { username, password } = account;
  if (username !== mockAccount.username) {
    return "That username is taken. Please choose another.";
  } else if (password.length < 8 || password.length > 72) {
    return "Passwords should be between 8 and 72 characters long. Please choose another.";
  }
  return Status.Success;
}

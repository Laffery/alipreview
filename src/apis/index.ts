import { catchError, forkJoin, Observable, of, switchMap } from "rxjs";
import { Account, Story } from "hackernews";
import { fromFetch } from "rxjs/fetch";
import { baseUrl } from "config";
import { account as mockAccount } from "config";
import { Status } from "utils";

/**
 * 根据id获取news信息
 * @param id news id
 * @returns news meta data
 */
export function getStoryById(id: number): Observable<Story> {
  return fromFetch(`${baseUrl}/v0/item/${id}.json`, {
    selector: (res) => res.json() as Promise<Story>,
  });
}

/**
 * 获取排行榜靠前的news id
 */
export function getTopStories(): Observable<Story[]> {
  return fromFetch(`${baseUrl}/v0/topstories.json`, {
    selector: (res) => res.json() as Promise<number[]>,
  }).pipe(
    switchMap((data) => {
      const stories = data.slice(0, 30);
      return forkJoin(stories.map((id) => getStoryById(id)));
    })
  );
}

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
export function login(account: Account): Observable<string> {
  return fromFetch(`${baseUrl}/submit.json`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: cvtAccount2FormData(account),
  }).pipe(
    switchMap(async (res) => {
      throw res;
    }),
    catchError((err) => {
      console.debug(err);
      if (
        account.username !== mockAccount.username ||
        account.password !== mockAccount.password
      )
        return of("Bad Login.");

      return of(Status.Success);
    })
  );
}

/**
 * 新建账户接口
 */
export function register(account: Account): Observable<string> {
  return fromFetch(`${baseUrl}/submit`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: cvtAccount2FormData(account),
  }).pipe(
    switchMap(async (res) => {
      throw res;
    }),
    catchError((err) => {
      console.debug(err);
      const { username, password } = account;
      if (username !== mockAccount.username) {
        return of("That username is taken. Please choose another.");
      } else if (password.length < 8 || password.length > 72) {
        return of(
          "Passwords should be between 8 and 72 characters long. Please choose another."
        );
      }
      return of(Status.Success);
    })
  );
}

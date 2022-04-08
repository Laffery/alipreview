import { firstValueFrom, forkJoin, Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Account, Story } from "hackernews";
import { baseUrl, account as mockAccount, apiUrl } from "config";
import { fromFetch } from "rxjs/fetch";
import { Status } from "shared/utils";

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
export function getTopStories(): Promise<Story[]> {
  const source$ = fromFetch(`${baseUrl}/v0/topstories.json`, {
    selector: (res) => res.json() as Promise<number[]>,
  }).pipe(
    switchMap((data) => {
      const stories = data.slice(0, 30);
      return forkJoin(stories.map((id) => getStoryById(id)));
    })
  );
  return firstValueFrom(source$);
}

/**
 * 登录
 */
export function login(account: Account): Observable<string> {
  return fromFetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(account),
  }).pipe(
    switchMap(async (res) => {
      return await res.text();
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
  return fromFetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(account),
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

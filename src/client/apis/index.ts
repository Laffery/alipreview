import { forkJoin, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Account, Story } from "hackernews";
import { baseUrl, apiUrl } from "config";
import { fromFetch } from "rxjs/fetch";

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

/** 登录 */
export function login(account: Account): Observable<string> {
  return fromFetch(`${apiUrl}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(account),
  }).pipe(
    switchMap(async (res) => {
      return await res.text();
    })
  );
}

/** 注册 */
export function register(account: Account): Observable<string> {
  return fromFetch(`${apiUrl}/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(account),
  }).pipe(
    switchMap(async (res) => {
      return await res.text();
    })
  );
}

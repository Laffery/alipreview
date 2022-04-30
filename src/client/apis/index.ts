import { forkJoin, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
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

function storiesPagination(
  type: "top" | "new" | "ask" | "show" | "job",
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  return fromFetch(`${baseUrl}/v0/${type}stories.json`, {
    selector: (res) => res.json() as Promise<number[]>,
  }).pipe(
    switchMap((data) => {
      const stories = data.slice(start, end);
      return forkJoin(stories.map((id) => getStoryById(id)));
    })
  );
}

/**
 * 获取排行榜靠前的news id
 */
export function getTopStories(
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  return storiesPagination("top", pageIndex, pageSize);
}

/**
 * 获取最新的Stories
 */
export function getNewestStories(
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  return storiesPagination("new", pageIndex, pageSize);
}

/**
 * 获取提问的Stories
 */
export function getAskStories(
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  return storiesPagination("ask", pageIndex, pageSize);
}

/**
 * 获取展示的Stories
 */
export function getShowStories(
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  return storiesPagination("show", pageIndex, pageSize);
}

/**
 * 获取求职的Stories
 */
export function getJobsStories(
  pageIndex = 1,
  pageSize = 30
): Observable<Story[]> {
  return storiesPagination("job", pageIndex, pageSize);
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

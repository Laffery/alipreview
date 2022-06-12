import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { baseUrl, apiUrl } from "config";
import { fromFetch } from "rxjs/fetch";

/**
 * 根据id获取news信息
 * @param id news id
 * @returns news meta data
 */
export function getStoryById<T = Story>(id: number): Observable<T> {
  return fromFetch<T>(`${apiUrl}/item/${id}`, {
    selector: (res) => res.json(),
  });
}

/**
 * @param id news id
 */
export function getCommentsById(
  id: number
): Observable<{ parent: HNItemBase; comments: HNItemMap<Comment> }> {
  const parentStory$ = getStoryById<HNItemBase>(id);
  const commentMap: HNItemMap<Comment> = {};
  return parentStory$.pipe(
    map((story) => {
      if (story.type === "comment") commentMap[story.id] = story as Comment;
      return story;
    }),
    switchMap((story) => {
      if (!story.kids) return of({ parent: story, comments: commentMap });
      return forkJoin(story.kids.map(getCommentsById)).pipe(
        map((commentList) => {
          commentList.forEach(({ comments }) => {
            Object.assign(commentMap, comments);
          });
          return { parent: story, comments: commentMap };
        })
      );
    })
  );
}

function storiesPagination<T = Story>(
  type: "top" | "new" | "ask" | "show" | "job",
  pageIndex = 1,
  pageSize = 30
): Observable<T[]> {
  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  return fromFetch<number[]>(`${baseUrl}/v0/${type}stories.json`, {
    selector: (res) => res.json(),
  }).pipe(
    map((ids) => ids.slice(start, end)),
    switchMap((ids) => forkJoin(ids.map((id) => getStoryById<T>(id))))
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
  }).pipe(switchMap((res) => res.text()));
}

/** 注册 */
export function register(account: Account): Observable<string> {
  return fromFetch(`${apiUrl}/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(account),
  }).pipe(switchMap((res) => res.text()));
}

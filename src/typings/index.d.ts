declare module "hackernews" {
  export interface Story {
    id: number;
    by: string;
    type: string;
    title: string;
    text: string;
    descendants: number;
    score: number;
    /**
     * @note 一些来自本站点的帖子在响应体中没有url字段，如https://news.ycombinator.com/item?id=30668137
     */
    url?: string;
    kids?: number[];
    time?: number;
  }

  export interface Account {
    username: string;
    password: string;
  }
}

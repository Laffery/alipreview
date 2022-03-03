declare module "hackernews" {
  export interface Item {
    id: number;
    url: string;
    by: string;
    type: string;
    title: string;
    text: string;
    descendants: number;
    score: number;
    kids?: number[];
    time?: number;
  }
}

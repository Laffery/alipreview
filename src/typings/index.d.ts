interface SSRData {
  props: Record<string, unknown>;
  location: string;
  cookie: string;
}

interface BuildManifest {
  scripts: Record<string, string>;
  styles: Record<string, string>;
}

interface BuildManifest {
  scripts: Record<string, string>;
  styles: Record<string, string>;
}

type GetServerSideProps<T extends Record<string, unknown>> = () => Promise<{
  props: T;
}>;

interface SSRComponent {
  default: (props: Record<string, unknown>) => JSX.Element;
  getServerSideProps?: GetServerSideProps;
}

type SSRData = SSRData;

declare interface Window {
  SSR?: boolean;
  SSR_DATA?: SSRData;
}

declare module "hackernews" {
  export interface Story {
    id: number;
    by: string;
    type: "job" | "story" | "comment" | "poll" | "pollopt";
    title: string;
    text: string;
    descendants: number; // in the case of stories or polls, the total comment count
    score: number; // The story's score, or the votes if it is a pollopt
    /**
     * @note 一些来自本站点的帖子在响应体中没有url字段，如https://news.ycombinator.com/item?id=30668137
     */
    url?: string; // The URL of the story
    kids?: number[]; // The ids of the item's comments, in ranked display order
    parts?: number[]; // A list of related pollopts, in display order
    time?: number; // creation date of the item, in Unix Time
    deleted?: boolean; // true if the item is deleted
  }

  export interface Account {
    username: string;
    password: string;
  }

  export interface User {
    id: string;
    created: number;
    karma: number;
    about?: string;
    submitted?: number[];
  }
}

declare module "app" {
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
}

declare interface Window {
  SSR?: boolean;
  SSR_DATA?: { props: Record<string, unknown> };
}

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

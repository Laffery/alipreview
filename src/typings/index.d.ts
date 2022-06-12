interface SSRData {
  props: Record<string, unknown>;
  location: string;
  cookie?: string;
}

interface BuildManifest {
  scripts: Record<string, string>;
  styles: Record<string, string>;
}

interface BuildManifest {
  scripts: Record<string, string>;
  styles: Record<string, string>;
}

declare interface Window {
  SSR?: boolean;
  SSR_DATA?: SSRData;
}

type GetServerSidePropsContext = {
  query: Record<string, string>;
};

type GetServerSideProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = (context: GetServerSidePropsContext) => Promise<{ props: T }>;

interface SSRComponent {
  default: (props: Record<string, unknown>) => JSX.Element;
  getServerSideProps?: GetServerSideProps;
}

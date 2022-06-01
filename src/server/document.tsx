import React from "react";
import ReactDOMServer from "react-dom/server";
import { Context, defaultContextValue } from "shared/context";

const PUBLIC_URL = "/_static";

type DocumentProps = {
  title: string;
  scripts: string[];
  styles: string[];
  element: SSRComponent;
} & Omit<SSRData, "props">;

class Document {
  private title: string;
  private scripts: string[];
  private styles: string[];
  private location: string;
  private element: SSRComponent;
  private cookie: string;
  private ssrData: SSRData = defaultContextValue;

  constructor({
    title = "React App",
    scripts = [],
    styles = [],
    location = "/",
    cookie = "",
    element = { default: () => <div>Loading...</div> },
  }: Partial<DocumentProps>) {
    this.title = title;
    this.scripts = scripts;
    this.styles = styles;
    this.element = element;
    this.location = location;
    this.cookie = cookie;
  }

  protected isSSR(): boolean {
    return this.element.getServerSideProps !== undefined;
  }

  protected async InitializedSSRComponent(component?: SSRComponent) {
    if (!component || !component.getServerSideProps) return null;
    const { default: App, getServerSideProps } = component;

    // Server side data fetching
    const { props } = await getServerSideProps();
    this.ssrData = { props, location: this.location, cookie: this.cookie };

    return (
      <React.StrictMode>
        <Context.Provider value={this.ssrData}>
          <App {...props} />
        </Context.Provider>
      </React.StrictMode>
    );
  }

  protected generateInjectFunction(): string {
    if (!this.isSSR()) return "";
    return `
      (function () {
        window.SSR = true;
        window.SSR_DATA = ${JSON.stringify(this.ssrData)};
      })();
    `;
  }

  public async render() {
    const { title, scripts, styles, element } = this;
    const Page = await this.InitializedSSRComponent(element);

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="shortcut icon"
            href="https://news.ycombinator.com/favicon.ico"
          />
          <title>{title}</title>
          <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.generateInjectFunction() }}
          />
          {scripts.map((script, index) => (
            <script
              defer
              key={index}
              src={`${PUBLIC_URL}/${script}`}
              type="text/javascript"
            />
          ))}
          {styles.map((href, index) => (
            <link key={index} href={`${PUBLIC_URL}/${href}`} rel="stylesheet" />
          ))}
        </head>
        <body>
          <div id="root">{Page}</div>
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </body>
      </html>
    );
  }

  public async renderToString() {
    return (
      "<!DOCTYPE html>\n" + ReactDOMServer.renderToString(await this.render())
    );
  }
}

export default Document;

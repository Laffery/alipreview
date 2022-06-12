import express from "express";
import fs from "fs-extra";
import path from "path";
import urlParse from "url-parse";
import Document from "./document";
import services from "./services";

/** __dirname is dist/server */
const PUBLIC_URL = path.resolve(__dirname, "../static");

const manifest: BuildManifest = fs.readJSONSync(
  path.join(PUBLIC_URL, "build.manifest.json")
);

class Server {
  private app: express.Express;
  constructor() {
    this.app = express();
    this.useMiddleware();
    this.useRouter();
  }

  private useMiddleware() {
    // enable application/json
    this.app.use(express.json());

    this.app.use("/_static", async (req, res, next) => {
      express.static(PUBLIC_URL, {})(req, res, () => {
        // prevent _static to be rendered as page
        if (/^\/$/.test(req.url)) return res.end(req.url);
        return next();
      });
    });

    this.app.use("/api", services);
  }

  private useRouter() {
    this.app.get("/*", async (req, res) => {
      const { pathname } = urlParse(req.url);
      if (!Object.keys(manifest.scripts).includes(pathname)) {
        return res.end("404 Not Found");
      }

      const component: SSRComponent = require(`../client/pages${pathname}`);
      const scripts = [manifest.scripts.main, manifest.scripts[pathname]];
      const styles = [manifest.styles.main];

      const document = new Document({
        title: "Hacker News",
        scripts,
        styles,
        element: component,
        req,
      });

      res.end(await document.renderToString());
    });
  }

  public start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

const server = new Server();
server.start(3000);

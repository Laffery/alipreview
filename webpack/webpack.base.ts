// webpack base configuration
import path from "path";
import glob from "glob";
import { Configuration } from "webpack";
import "webpack-dev-server";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import tsConfig from "../tsconfig.json";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const workspace = path.join(__dirname, "../");
const sourceDir = path.join(workspace, "src/client");
const outputDir = path.join(workspace, "dist/static");
const publicDir = path.join(workspace, "public");

const hash =
  process.env.NODE_ENV === "production" ? "[chunkhash:8]" : "[contenthash:8]";

function getEntries(dirPath: string, patterns: string): Record<string, string> {
  const files = glob.sync(path.join(dirPath, patterns));
  const entries: Record<string, string> = {};
  files.forEach((file) => {
    const relative = path.relative(dirPath, file);
    const entryName = path.join(
      path.sep,
      relative.replace(/((\/|\\)?index)?\.(jsx?|tsx?)/g, "")
    );
    entries[entryName] = file;
  });
  return entries;
}

const baseConfig: Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: path.join(sourceDir, "index.tsx"),
    ...getEntries(path.join(sourceDir, "pages"), "/**/index.@(js|jsx|ts|tsx)"),
    ...getEntries(path.join(sourceDir, "pages"), "/*.@(js|jsx|ts|tsx)"),
  },
  output: {
    path: outputDir,
    filename: (e) => {
      if (!e.chunk || !e.chunk.name) return `${hash}.js`;
      const { name } = e.chunk;
      if (name === "main") {
        return path.join("chunks", `main.${hash}.js`);
      }

      return path.join(
        "chunks",
        name === path.sep ? "pages" : "pages[name]",
        `index.${hash}.js`
      );
    },
    chunkFilename: `index.${hash}.js`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      fileName: "build.manifest.json",
      filter: (file) => file.isChunk,
      generate: (_seed, files) => {
        const manifest: {
          scripts: Record<string, string>;
          styles: Record<string, string>;
        } = {
          scripts: {},
          styles: {},
        };
        files.forEach((file) => {
          const path = file.path.replace(/auto/, "").replace(/(\/|\\)+/g, "/");
          // is script
          if (/.*\.js/.test(file.name)) {
            manifest.scripts[file.name.replace(/\.js/, "")] = path;
          }
          // is stylesheet
          else if (/.*\.css/.test(file.name)) {
            manifest.styles[file.name.replace(/\.css/, "")] = path;
          }
        });
        return manifest;
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicDir,
          to: outputDir,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: (e) => {
        if (!e.chunk || !e.chunk.name) return `${hash}.css`;
        const { name } = e.chunk;
        if (name === "main") return path.join("css", `main.${hash}.css`);
        return path.join(
          name === path.sep ? "css" : "css[name]",
          `index.${hash}.css`
        );
      },
    }),
  ],
  resolve: {
    plugins: [
      new TSConfigPathsPlugin({
        baseUrl: tsConfig.compilerOptions.baseUrl,
      }),
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // no license comments
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      // javascript
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // typescript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      // css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
};

export default baseConfig;

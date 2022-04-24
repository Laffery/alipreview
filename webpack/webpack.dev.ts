// webpack development configuration
import { Configuration } from "webpack";
import path from "path";
import baseConfig from "./webpack.base";

const workspace = path.join(__dirname, "../");

const devConfig: Configuration = {
  ...baseConfig,
  devServer: {
    historyApiFallback: true,
    watchFiles: path.join(workspace, "src"),
    open: false,
    compress: true,
    hot: true,
  },
};

export default devConfig;

// webpack production configuration
import { Configuration } from "webpack";
import baseConfig from "./webpack.base";

const prodConfig: Configuration = {
  ...baseConfig,
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    compress: true,
  },
};

export default prodConfig;

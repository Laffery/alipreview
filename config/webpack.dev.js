// webpack development configuration
const webpackBaseConfig = require('./webpack.base');
const paths = require('./path.config');

module.exports = {
  ...webpackBaseConfig,
  devServer: {
    historyApiFallback: true,
    watchFiles: paths.src,
    open: false,
    compress: true,
    hot: true,
    host: '127.0.0.1',
    port: process.env.PORT ?? 3000,
  },
}

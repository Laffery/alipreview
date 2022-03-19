// webpack production configuration
const webpackBaseConfig = require('./webpack.base');

module.exports = {
  ...webpackBaseConfig,
  mode: 'production',
}

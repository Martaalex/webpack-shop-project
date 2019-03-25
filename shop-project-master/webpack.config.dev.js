const merge = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');

module.exports = merge.smart(webpackBase, {
  mode: 'development',

  devServer: {
    port: 9000,
  },
});

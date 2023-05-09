const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      // favicon: './src/assets/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
});

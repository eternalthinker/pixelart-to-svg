const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
      // favicon: './src/assets/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: false,
        html5: true,
        removeComments: false,
        removeEmptyAttributes: true,
      },
    }),
  ],
});

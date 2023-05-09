// Webpack uses this to work with directories
const path = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },

  devtool: "inline-source-map",

  plugins: [],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
      {
        test: /\.(csv|txt)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "csv",
            },
          },
        ],
      },
    ],
  },
};

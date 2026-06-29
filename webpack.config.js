const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|webp|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),

  new CopyPlugin({
    patterns: [
      { from: 'src/assets', to: 'assets' }
    ],
  }),
  ],

  devServer: {
    static: "./public",
    port: 3000,
    open: true,
    hot: true,
  },
};
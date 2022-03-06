const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
  ],
  resolve: {
    modules: [__dirname, "client", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader", 
          "css-loader", 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      }, 
    ],
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'build'),
        publicPath: '/build'
      },
    //possibly add in 8080 target
    proxy: {
        '/': {
            target: 'http://localhost:8080/',
            router: () => 'http://localhost:3000',
            secure: false,
        },
    },
    hot: true,
  },
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const port = 3000;

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  devServer: {
    hot: true,
    port: port || 3000,
    open: true,
    // page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // "style-loader" // added styles to the head of index.html
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/,
        exclude: /icons/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        include: path.join(__dirname, "./src/icons"),
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              spriteFilename: () => "sprite.svg",
              symbolId: (filePath) => path.basename(filePath),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ["*", ".ts", ".tsx", ".js", ".png"],
  },
};

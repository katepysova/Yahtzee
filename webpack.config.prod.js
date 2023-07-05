const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
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
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 5 versions",
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 5 versions",
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/,
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
    extensions: ["*", ".ts", ".tsx", ".js"],
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      path: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("https://jsonplaceholder.typicode.com"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    chunkIds: "named",
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
          name: "common",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    hints: "error",
    maxAssetSize: 1000000,
    maxEntrypointSize: 400000,
  },
};

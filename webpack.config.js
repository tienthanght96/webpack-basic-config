const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWepackPlugin = require("html-webpack-plugin");
const VENDOR_LIBS = [
  "axios",
  "bootstrap",
  // "font-awesome",
  "jquery",
  "react",
  "react-dom",
  "react-redux",
  "react-router",
  "react-router-dom",
  "redux",
  "redux-thunk"
];
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const devServer = {
  port: 400,
  open: true,
  contentBase: "/",
  compress: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: true,
  inline: true,
  hot: true
};
const config = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },
  output: {
    // filename: "[name].[chunkhash].js",
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  performance: { hints: false },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: "/node_modules/"
      },
      /*   {
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      }, */
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
                includePaths: ["absolute/path/a", "absolute/path/b"]
            }
        }]
      },
      /* {
        use: ExtractTextPlugin.extract({
          use: "css-loader",
          fallback: "style-loader"
        }),
        test: "/.css$/"
      }, */
      {
        loader: "file-loader",
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "style.css"
    }),
    new HtmlWepackPlugin({
      template: "src/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
      "window.Popper": "popper.js/dist/umd/popper"
    }),
    extractSass
  ]
};
module.exports = config;

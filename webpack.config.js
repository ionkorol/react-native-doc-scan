var HtmlWebpackPlugin = require("html-webpack-plugin");
// var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: ["./dist/index.js"],
  output: {
    filename: "bundle.js",
    path: __dirname,
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: ".(js|css)$", // embed all javascript and css inline
    }),
    // new HtmlWebpackInlineSourcePlugin(),
  ],
  optimization: {
    minimize: true,
  },
};

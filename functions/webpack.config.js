var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./dist/index.js"],
  output: {
    filename: "bundle.js",
    path: __dirname,
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: ".(js|css)$",
    }),
  ],
  optimization: {
    minimize: true,
  },
};

var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MergeYamlWebpackPlugin = require('../index.js');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new MergeYamlWebpackPlugin({
      root: 'zh-TW',
      files: [
        'example/src/dict/zh-TW.yml',
        'example/src/dict/base/zh-TW.yml',
      ],
      outputPath: 'example/dist',
      fileName: 'zh-TW.yml'
    })
  ]
};

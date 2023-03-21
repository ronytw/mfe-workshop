const { merge } = require('webpack-merge');
const HtmlWelpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: "production",
  plugins: [
    new HtmlWelpackPlugin({
      template: "./public/index.html",
    }),
  ],
  entry: {
    catalog: './src/index.js',
    catalogWithContainer: './src/indexWithContainer.js',
  },
  output: {
    filename: '[name].bundle.js',
    clean: true,
  }
};

module.exports = merge(commonConfig, devConfig);

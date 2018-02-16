'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const WebpackBaseConfig = require('./Base');
const globalConfig = require('../global_config');

class WebpackDistConfig extends WebpackBaseConfig {

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  constructor() {
    super();

    let thisUniqueHash = this.getRandomInt(999999999999999, 99999999999999999999);
    let appUniqueFileName = 'app' + thisUniqueHash + '.js';

    this.config = {
      cache: false,
      devtool: 'source-map',
      output: {
        path: path.resolve('./dist'),
        filename: appUniqueFileName
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            drop_console: true,
          },
          output: {
            comments: false,
          }
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.ejs',
          jsfilesource: appUniqueFileName + '.gz',
          hash: true,
          inject: false
        }),
        new CompressionPlugin({
          test: /\.js/,
          deleteOriginalAssets: true,
        }),
      ],
    }
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist'
  }
}

module.exports = WebpackDistConfig;

'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const WebpackBaseConfig = require('./Base');
const globalConfig = require('../global_config');
// const S3Plugin = require('webpack-s3-plugin');

// let server = globalConfig.devServer
const distCdnServer = globalConfig.distCdnServer;

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
          jsfilesource: appUniqueFileName,
          hash: true,
          inject: false
        }),
        // new ProgressBarPlugin(),
        //   new S3Plugin({
        //       // s3Options are required
        //       s3Options: {
        //         accessKeyId: process.env.PERSONAL_IAM_ACCESS_KEY,
        //         secretAccessKey: process.env.PERSONAL_IAM_SECRET,
        //         region: 'us-west-2'
        //       },
        //       s3UploadOptions: {
        //         Bucket: 'www.animallabs.xyz'
        //       }
        //   })
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

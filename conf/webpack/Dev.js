'use strict'

/**
 * Default dev server configuration.
 */
const webpack = require('webpack')
const WebpackBaseConfig = require('./Base')
// html generation
const HtmlWebpackPlugin = require('html-webpack-plugin')
// before and after scripts
// const WebpackShellPlugin = require('webpack-shell-plugin')

const globalConfig = require('../global_config')

let devServer = globalConfig.devServer

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super()
    this.config = {
      devtool: 'eval',
      // devtool: 'cheap-module-source-map',
      // devtool: 'source-map',
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000/',
        'webpack/hot/only-dev-server',
        './index.js'
      ],
      output: {
        path: '/dist',
        filename: 'app.js'
      },
      plugins: [
        // new WebpackShellPlugin({
        //   verbose: true
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.ejs',
          jsfilesource: devServer + '/app.js',
          inject: false
        })
      ]
    }
  }
}

module.exports = WebpackDevConfig

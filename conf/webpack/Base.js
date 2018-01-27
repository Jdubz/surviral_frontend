'use strict'

/**
 * Webpack configuration base class
 */
const path = require('path')
const npmBase = path.join(__dirname, '../../node_modules')

// Fixes a few errors in IE 11, 'Object.assign not regognized'
require("babel-polyfill")

class WebpackBaseConfig {

  constructor() {
    this._config = {}
  }

  /**
   * Get the list of included packages
   * @return {Array} List of included packages
   */
  get includedPackages() {
    return [].map((pkg) => path.join(npmBase, pkg))
  }

  /**
   * Set the config data.
   * This will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data)
    return this._config
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return this._config
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dev'
  }

  /**
   * Get the absolute path to src directory
   * @return {String}
   */
  get srcPathAbsolute() {
    return path.resolve('./app')
  }

  /**
   * Get the absolute path to tests directory
   * @return {String}
   */
  get testPathAbsolute() {
    return path.resolve('./test')
  }

  /**
   * Get the default settings
   * @return {Object}
   */
  get defaultSettings() {
    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      devServer: {
        contentBase: './app/',
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
      },
      entry: ['babel-polyfill', './index.js'],
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loader:"style-loader!css-loader!sass-loader?OutputStyle=expaned&" +
      'includePaths[]=' +
      (encodeURIComponent(
          path.resolve(process.cwd(), './node_modules')
      )) +
      '&includePaths[]=' +
      (encodeURIComponent(
              path.resolve(process.cwd(),
                  './node_modules/grommet/node_modules'))
      )
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|xml)$/,
            loaders: ['file-loader']
          },
          {
            test: /\.json$/,
            loaders: 'json-loader'
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: ['transform-decorators-legacy' ],
              presets: ['es2015', 'stage-0', 'react']
            }
          }
        ]
      },
      plugins: [],
      resolve: {
        alias: {
          components: `${this.srcPathAbsolute}/components/`,
          config: `${this.srcPathAbsolute}/config/${this.env}.js`,
          images: `${this.srcPathAbsolute}/images/`,
          sources: `${this.srcPathAbsolute}/sources/`,
          stores: `${this.srcPathAbsolute}/stores/`,
          styles: `${this.srcPathAbsolute}/styles/`,
          services: `${this.srcPathAbsolute}/services/`
        },
        extensions: ['.js', '.jsx', '.json'],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      }
    }
  }
}

module.exports = WebpackBaseConfig

var path = require('path')
var webpack = require('webpack')
var vendor = require('./config/vendor')
var loaders = require('./config/loaders')
var postLoaders = require('./config/postLoaders')

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve('./.temp/app.js')],
    vendor
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js'
  },
  /*resolve: {
    alias: {
      'webworkify': 'webworkify-webpack'
    }
  },*/
  module: {
    loaders
    //, postLoaders
  },
  glsl: {
    chunkPath: __dirname + "/glsl/chunks"
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity)
  ]
}

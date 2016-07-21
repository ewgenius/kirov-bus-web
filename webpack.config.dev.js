var path = require('path')
var webpack = require('webpack')
var vendor = require('./config/vendor')
var loaders = require('./config/loaders')
var postLoaders = require('./config/postLoaders')

module.exports = {
  entry: {
    app: ['babel-polyfill', './.temp/app.js'],
    vendor
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  resolve: {
    alias: {
      'webworkify': 'webworkify-webpack'
    }
  },
  module: {
    loaders,
    postLoaders
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity)
  ]
}

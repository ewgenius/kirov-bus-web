var path = require('path')
var webpack = require('webpack')
var vendor = require('./config/vendor')
var loaders = require('./config/loaders')

module.exports = {
  entry: {
    app: path.resolve('./src/app.jsx'),
    vendor
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity)
  ]
}
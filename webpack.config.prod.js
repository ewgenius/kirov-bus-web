var webpack = require('webpack')
var loaders = require('./config/loaders')
var vendor = require('./config/vendor')
var postLoaders = require('./config/postLoaders')

module.exports = {
  entry: {
    app: ['babel-polyfill', './.temp/app.js'],
    vendor
  },
  output: {
    filename: '[name].bundle.js',
    path: './build'
  },
  module: {
    loaders,
    postLoaders
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}

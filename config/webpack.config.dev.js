const path = require('path')
const webpack = require('webpack')
const loaders = require('./loaders')
const vendor = require('./vendor')
const postLoaders = require('./postLoaders')

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/app.tsx'],
    vendor
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./build')
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
}

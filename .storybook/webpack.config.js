var path = require('path')
var webpack = require('webpack')
var loaders = require('../config/loaders')
var postLoaders = require('../config/postLoaders')

module.exports = {
  resolve: {
    alias: {
      'webworkify': 'webworkify-webpack'
    }
  },
  module: {
    loaders,
    postLoaders
  }
}

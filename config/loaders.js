const path = require('path')

module.exports = [{
  test: /\.js$/,
  include: path.resolve('node_modules/mapbox-gl-shaders/index.js'),
  loader: 'babel'
}, {
  test: /\.tsx?$/,
  loader: 'ts-loader'
}, {
  test: /\.css$/,
  loader: 'style-loader!css-loader'
}, {
  test: /\.scss/,
  loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
}, {
  test: /\.woff(2)?(\?v=.+)?$/,
  loader: 'url-loader?limit=10000&minetype=application/font-woff'
}, {
  test: /\.(ttf|eot|svg|otf)(\?v=.+)?$/,
  loader: 'file-loader'
}, {
  test: /\.(png|jpg|gif)$/,
  loader: 'file-loader?limit=8192'
}, {
  test: /\.json$/,
  loader: 'json-loader'
}]

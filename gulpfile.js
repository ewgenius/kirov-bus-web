const gulp = require('gulp')
const gutil = require('gutil')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.config.dev.js')

gulp.task('serve', () => {
  new WebpackDevServer(webpack(webpackDevConfig), {
      hot: true,
      contentBase: 'dist',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      stats: {
        colors: true
      }
    })
    .listen(8080, 'localhost', err => {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html')
    })
})

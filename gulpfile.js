const fs = require('fs')
const gulp = require('gulp')
const gutil = require('gutil')
const jade = require('gulp-jade')
const webpack = require('webpack')

const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.config.dev.js')
const webpackProdConfig = require('./webpack.config.prod.js')

const manifest = require('./config/manifest.js')

const appName = manifest.name
const backgroundColor = manifest.background_color
const themeColor = manifest.theme_color

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

gulp.task('markup', () => {
  gulp.src('./src/index.jade')
    .pipe(jade({
      locals: {
        title: appName,
        themeColor: themeColor
      }
    }))
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('icons', () => {
  gulp.src('./src/assets/icons/*')
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('manifest', cb => {
  fs.writeFile('./build/manifest.json', JSON.stringify(manifest, null, 2), cb)
})

gulp.task('bundle', ['markup', 'icons', 'manifest'], cb => {
  return webpack(webpackProdConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err)
    gutil.log("[webpack]", stats.toString({}))
    cb()
  })
})

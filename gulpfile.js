const { src, dest, series} = require('gulp');
const concat = require('gulp-concat');
const minifyjs = require('gulp-minify');
const cssnano = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const optimizeimg = require('gulp-imagemin');

function htmlTask() {
  return src('src/*.html')
    .pipe(dest('dist'))
}

function jsTask() {
  return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(minifyjs())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
}

function cssTask() {
  return src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
}

function imagesTask() {
  return src('src/images/*.png')
    .pipe(optimizeimg())
    .pipe(dest('dist/images'))
}

exports.default = series(htmlTask, jsTask, cssTask, imagesTask);
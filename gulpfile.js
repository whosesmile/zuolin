var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sequence = require('run-sequence');
// var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var html2js = require('gulp-ng-html2js');
var htmlmin = require('gulp-minify-html');

// for dist should be dist
var target = '.tmp/';

/**
 * clean tmp and dist
 */
gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], {
    read: false
  }).pipe(clean());
});

/**
 * sync app to tmp
 */
gulp.task('sync', function () {
  return gulp.src(['src/assets/**/*', 'src/*.*'], {
    base: 'src'
  }).pipe(gulp.dest(target)).pipe(connect.reload());
});

/**
 * angular html2js
 */
gulp.task('html2js', function () {
  return gulp.src('src/app/**/*.html').pipe(htmlmin({
    empty: true,
    spare: true,
    quotes: true
  })).pipe(html2js({
    moduleName: 'templates',
    declareModule: false,
  })).pipe(concat('templates.js')).pipe(gulp.dest(target)).pipe(connect.reload());
});

/**
 * angular concat all files
 */
gulp.task('concat', function () {
  return gulp.src(['src/app/index.js', 'src/app/modules/**/router.js', 'src/app/modules/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(target)).pipe(connect.reload());
});

/**
 * watch file change
 */
gulp.task('watch', function () {
  gulp.watch(['src/assets/**/*', 'src/*.*'], ['sync']);
  gulp.watch(['src/app/**/*.html'], ['html2js']);
  gulp.watch(['src/app/index.js', 'src/app/modules/**/*'], ['concat']);
});

/**
 * connect server
 */
gulp.task('connect', function () {
  connect.server({
    root: [target, '.'],
    port: 3000,
    livereload: true
  });
});

/**
 *  Default task clean temporaries directories and launch the main optimization build task
 */
gulp.task('default', function () {
  sequence('clean', ['sync', 'html2js', 'concat'], 'connect', 'watch');
});

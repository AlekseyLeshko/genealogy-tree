var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean')

var paths = {
  scripts: ['src/js/**/*.js']
};

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

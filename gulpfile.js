var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');

var paths = {
  scripts: ['src/js/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js/'));
});

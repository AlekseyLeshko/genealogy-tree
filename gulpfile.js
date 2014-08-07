var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var _ = require('lodash');
var karma = require('karma').server;
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

var paths = {
  scripts: ['src/js/**/*.js'],
  examples: ['node_modules/jquery/dist/jquery.min.js',
    'node_modules/underscore/underscore-min.js',
    'node_modules/d3/d3.min.js',
    'dist/js/all.min.js']
};

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('examples', function () {
  return gulp.src(paths.examples)
    .pipe(gulp.dest('examples/js/lib/'));
});

gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build']);
  gulp.watch(['examples/**/*.*', '!examples/js/lib'], ['build']);
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 9001,
    livereload: true
  });
});

var karmaCommonConf = {
  basePath : '',
  browsers: [
    'Chrome',
    'PhantomJS',
    'Firefox',
    'FirefoxAurora',
    'FirefoxNightly'
  ],
  frameworks: ['jasmine'],
  files: [
    'src/js/**/*.js',
    'test/unit/**/*.js',
    'node_modules/underscore/underscore-min.js',
    'node_modules/d3/d3.min.js',
    'node_modules/jquery/dist/jquery.min.js'
  ],
  autoWatch : true,
  usePolling: true,
  plugins : [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-firefox-launcher',
    'karma-jasmine',
    'karma-coverage'
  ],
  reporters: ['progress', 'coverage'],
  preprocessors: {
    'src/js/**/*.js': ['coverage']
  },
  coverageReporter: {
    type : 'html',
    dir : 'coverage/'
  }
};

gulp.task('tdd', function (done) {
  karma.start(_.assign({}, karmaCommonConf, {
    browsers: ['PhantomJS']
  }), done);
});

gulp.task('tests', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('build-tests', function(callback) {
  runSequence(['scripts', 'tests'], callback);
});

gulp.task('build', function(callback) {
  runSequence('scripts', 'examples', callback);
});

gulp.task('default', function(callback) {
  runSequence('build', ['connect', 'watch', 'tdd'], callback);
});

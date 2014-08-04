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
  scripts: ['src/js/**/*.js']
};

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(concat('all.min.js'))
    // .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch('examples/**/*.*', ['scripts']);
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
  browsers: ['Chrome'],
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
    'karma-junit-reporter',
    'karma-coverage'
  ],

  junitReporter : {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
  },

  reporters: ['progress', 'coverage'],

  preprocessors: {
    'src/js/**/*.js': ['coverage']
  },

  coverageReporter: {
    type : 'html',
    dir : 'coverage/'
  }
};

gulp.task('test-single-run', function (done) {
  karma.start(_.assign({}, karmaCommonConf, {singleRun: true, browsers: ['PhantomJS']}), done);
});

gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('default', function(callback) {
  runSequence('scripts', ['connect', 'watch', 'tdd'], callback);
});

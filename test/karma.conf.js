module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
      'src/js/**/*.js',
      'test/unit/**/*.js',
      'node_modules/underscore/underscore-min.js',
      'node_modules/d3/d3.min.js',
      'node_modules/jquery/dist/jquery.min.js'
    ],
    autoWatch : true,
    usePolling: true,
    frameworks: ['jasmine'],
    browsers : [
      'Chrome',
      'PhantomJS',
      'Firefox',
      'FirefoxAurora',
      'FirefoxNightly'
    ],
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
      reporters:[
        {
          type: 'html',
          dir:'coverage/'
        },
        {
          type: 'lcov',
          dir:'coverage/'
        }
      ]
    }
  });
};

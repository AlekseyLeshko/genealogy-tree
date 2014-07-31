module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'src/js/**/*.js',
      'test/unit/**/*.js',
      'node_modules/underscore/underscore-min.js'
    ],

    autoWatch : true,
    usePolling: true,

    frameworks: ['jasmine'],

    browsers : [
      'Chrome',
      'PhantomJS'
    ],

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
    },

    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--remote-debugger-port=9000']
      }
    }
  });
};

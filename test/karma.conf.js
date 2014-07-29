module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'src/js/**/*.js',
      'test/unit/**/*.js',
      'node_modules/underscore/underscore-min.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
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
  });
};

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
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

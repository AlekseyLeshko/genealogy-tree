GenealogyTree = function() {
  this.options = {};
};

GenealogyTree.prototype = {
  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.pluginOptions = $.extend(defaultOptions, options);
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      container: {
        width: 700,
        height: 700
      }
    };
    return defaultOptions;
  },
};

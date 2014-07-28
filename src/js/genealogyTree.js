GenealogyTree = function() {
  this.options = this.getDefaultOptions();
};

GenealogyTree.prototype = {
  getDefaultOptions: function() {
    var defaultOptions = {
      container: {
        width: 700,
        height: 700
      },
      stepX: 70,
      stepY: 70
    };
    return defaultOptions;
  },

  createLayoutLevel: function(nodeArr) {
    var layout = [];
    for (var i = 0; i < nodeArr.length; i++) {
      var node = nodeArr[i];
      node.width = 0;
      node.height = 0;
      layout.push(node);
    }
    return layout;
  },

  clone: function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
    return copy;
  }
};

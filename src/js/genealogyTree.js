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
      width: 1000,
      height: 1000,
      stepX: 50,
      stepY: 50
    };
    return defaultOptions;
  },

  createLayoutLevel: function(nodeArr) {
    var layout = [];
    var x = this.calcStartX(nodeArr.length, nodeArr[0].width);
    for (var i = 0; i < nodeArr.length; i++) {
      var node = this.clone(nodeArr[i]);
      node.x = x;
      node.y = 0;
      layout.push(node);
      x += this.options.stepX;
    }
    return layout;
  },

  calcStartX: function(countNode, widthNode) {
    var x = (countNode * widthNode) + ((countNode - 1) * this.options.stepX);
    return this.options.width - x;
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

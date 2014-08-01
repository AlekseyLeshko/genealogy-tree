var GenealogyTreeCalculator = function(layouts, edges) {
  'use strict';

  this.layouts = layouts;
  this.edges = edges;
  this.options = this.getDefaultOptions();
  this.level = 0;
};

GenealogyTreeCalculator.prototype = {
  getDefaultOptions: function() {
    var defaultOptions = {
      frame: {
        width: 250,
        height: 250
      },
      stepX: 80,
      stepY: 100,
      nodeWidth: 30
    };
    return defaultOptions;
  },

  calcCoordinatesForLayout: function(arr) {
    var layout = [];
    var y = this.calcValY();
    var x = this.calcValX(arr.length);
    for (var i = 0; i < arr.length; i++) {
      var node = arr[i];
      node.x = x;
      node.y = y;
      layout.push(node);
      y += this.options.stepY;
    }
    return layout;
  },

  calcContainerParameters: function() {
    this.options.container = {
      width: this.calcWidthСontainer(),
      height: this.calcHeightСontainer()
    };
  },

  widthCalculationLayout: function() {
    if (this.layouts.length <= 0) {
      return 0;
    }

    var arr = [];
    _.each(this.layouts, function(layout) {
      if (layout) {
        var length = layout.length;
        arr.push(length);
      }
    });

    if (arr.length <= 0) {
      return 0;
    }

    var maxCount = _.max(arr, function(length) {
      return length;
    });

    var width = (this.options.nodeWidth * maxCount) + ((maxCount - 1) * this.options.stepY);

    return width;
  },

  calcWidthСontainer: function() {
    var widthLayout = this.widthCalculationLayout();
    var frame = this.options.frame.width * 2;
    var width = widthLayout + frame;

    return width;
  },

  calcHeightСontainer: function() {
    var heightLayouts = (this.layouts.length * this.options.stepY);
    var frame = this.options.frame.height * 2;
    var height = heightLayouts + frame;

    return height;
  },

  calcValY: function() {
    var frame = this.options.frame.height;
    var heightLayouts = this.level * this.options.stepY;
    var y =  frame + heightLayouts;
    return y;
  },

  calcValX: function(countNode) {
    var x = (((countNode / 2) * this.options.nodeWidth) + ((countNode - 1) * this.options.stepX)) / 2;
    var res = (this.options.container.width / 2) - x;
    return res;
  }
};

//   calcCoordinatesForLayouts: function() {
//     for (var i = 0; i < this.layouts.length; i++) {
//       if (this.layouts[i]) {
//         this.level = i;
//         this.layouts[i] = this.calcCoordinatesForLayout(this.layouts[i]);
//       }
//     }
//   },

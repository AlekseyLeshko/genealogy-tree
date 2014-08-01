var GenealogyTreeCalculator = function(layouts, edges) {
  'use strict';

  this.layouts = layouts;
  this.edges = edges;
  this.options = this.getDefaultOptions();
};

GenealogyTreeCalculator.prototype = {
  getDefaultOptions: function() {
    var defaultOptions = {
      frame: {
        width: 250,
        height: 250
      },
      stepX: 75,
      stepY: 100,
    };
    return defaultOptions;
  },

//   calcContainerParameters: function() {
//     this.options.container = {
//       width: this.calcWidthСontainer(),
//       height: this.calcHeightСontainer()
//     };
//   },


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

//   calcCoordinatesForLayout: function(arr) {
//     var layout = [];
//     var y = this.calcStartY(arr.length);
//     var x = this.calcValX();
//     for (var i = 0; i < arr.length; i++) {
//       var node = arr[i];
//       node.x = x;
//       node.y = y;
//       layout.push(node);
//       y += this.options.stepY;
//     }
//     return layout;
//   },

//   calcStartY: function(countNode) {
//     var y = (((countNode / 2) * this.options.nodeWidth) + ((countNode - 1) * this.options.stepY)) / 2;
//     var res = (this.options.container.width / 2) - y;
//     return res;
//   },

//   calcValX: function() {
//     var frame = this.options.frame.height;
//     var width = this.level * this.options.stepX;
//     var x =  frame + width;
//     return x;
//   },


// };


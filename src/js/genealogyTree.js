GenealogyTree = function(nodes, relationships, rootRelationships) {
  this.init();

  this.nodes = nodes;
  this.relationships = relationships;
  this.dataLayouts[this.level] = rootRelationships;
};

GenealogyTree.prototype = {
  init: function() {
    this.options = this.getDefaultOptions();
    this.level = this.options.startLevel;
    this.dataLayouts = [];
    this.layouts = [];
    this.edges = [];
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      frame: {
        width: 250,
        height: 250
      },
      stepX: 75,
      stepY: 100,
      nodeWidth: 30,
      startLevel: 0
    };
    return defaultOptions;
  },

  generationLayouts: function() {
    do {
      this.generationLayout();
      if (this.needToCreateNextLayout()) {
        this.preparationNextLayout();
      } else {
        break;
      }
    } while(true);
  },

  preparationNextLayout: function() {
    this.level++;
    var nodeArr = this.findNodesByIds(this.dataLayouts[this.level]);
    this.dataLayouts[this.level] = this.getRelationships(nodeArr);
  },

  needToCreateNextLayout: function() {
    var answer = false;

    if (this.nextLayoutIsExists()) {
      answer = true;
    }
    return answer;
  },

  nextLayoutIsExists: function() {
    var nextLeval = this.level + 1;

    var layoutIsExists = this.dataLayouts[nextLeval];
    if (!layoutIsExists) {
      return false;
    }

    var layoutIsEmpty = this.dataLayouts[nextLeval].length > 0;
    if (!layoutIsEmpty) {
      return false;
    }

    return true;
  },

  generationLayout: function() {
    _.each(this.dataLayouts[this.level], this.preparationRelationship, this);
  },

  preparationRelationship: function(relationship) {
    this.addSpousesNodeToLayout(relationship);
    this.addNodesForLayoutData(relationship.children);
    this.createEdges(relationship);

    this.unsetRelationship(relationship);
  },

  addSpousesNodeToLayout: function(relationship) {
    var layout = [];

    var wifeNode = this.getNodeOfRelationship(relationship.wife);
    var husbandNode = this.getNodeOfRelationship(relationship.husband);
    layout.push(wifeNode);
    layout.push(husbandNode);

    this.addNodesForCurrentLayout(layout);
  },

  addNodesForLayoutData: function(arr) {
    var nextLeval = this.level + 1;
    var layout = this.dataLayouts[nextLeval];
    if (!layout) {
      layout = [];
    }

    layout = layout.concat(arr);

    this.dataLayouts[nextLeval] = layout;
  },

  addNodesForCurrentLayout: function(arr) {
    var layout = this.layouts[this.level];
    if (!layout) {
      layout = [];
    }

    layout = layout.concat(arr);

    this.layouts[this.level] = layout;
  },

  calcContainerParameters: function() {
    this.options.container = {
      width: this.calcWidthСontainer(),
      height: this.calcHeightСontainer()
    };
  },

  calcCoordinatesForLayouts: function() {
    for (var i = 0; i < this.layouts.length; i++) {
      if (this.layouts[i]) {
        this.level = i;
        this.layouts[i] = this.calcCoordinatesForLayout(this.layouts[i]);
      }
    };
  },

  calcCoordinatesForLayout: function(arr) {
    var layout = [];
    var y = this.calcStartY(arr.length);
    var x = this.calcValX();
    for (var i = 0; i < arr.length; i++) {
      var node = arr[i];
      node.x = x;
      node.y = y;
      layout.push(node);
      y += this.options.stepY;
    }
    return layout;
  },

  calcStartY: function(countNode) {
    var y = (((countNode / 2) * this.options.nodeWidth) + ((countNode - 1) * this.options.stepY)) / 2;
    var res = (this.options.container.width / 2) - y;
    return res;
  },

  calcValX: function() {
    var frame = this.options.frame.height;
    var width = this.level * this.options.stepX;
    var x =  frame + width;
    return x;
  },

  clone: function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
          }
      }
    return copy;
  },

  findElementInArr: function(key, val, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) {
        return arr[i];
      }
    }
  },

  getRelationships: function(nodes) {
    var key = 'id';
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var relationship = this.findElementInArr(key, node.relationship, this.relationships);

      if (!this.findElementInArr(key, relationship.id, arr)) {
        arr.push(relationship);
      }
    }
    return arr;
  },

  findNodesByIds: function(ids) {
    var key = 'id';
    var arr = [];
    for (var i = 0; i < ids.length; i++) {
      var val = ids[i];
      var node = this.findElementInArr(key, val, this.nodes);
      arr.push(node);
    }
    return arr;
  },

  createEdges: function(relationship) {
    var wifeNode = this.getNodeOfRelationship(relationship.wife);
    var husbandNode = this.getNodeOfRelationship(relationship.husband);

    var parentEdge = new Edge(husbandNode, wifeNode, relationship.type);
    this.edges.push(parentEdge);

    var nodeArr = this.findNodesByIds(relationship.children);

    _.each(nodeArr, function(node) {
      var edge = new Edge(parentEdge, node, relationship.childrenType);
      this.edges.push(edge);
    }, this);
  },

  getNodeOfRelationship: function(val) {
    var key = 'id';
    var node = this.findElementInArr(key, val, this.nodes);
    return node;
  },

  unsetRelationship: function(value) {
    var self = this;
    var index = _.find(this.relationships, function(obj) {
      self.comparison(obj, value);
    });

    if(!index) {
      return this.relationships.splice(index, 1);
    }
  },

  getNodes: function() {
    var nodes = [];
    for (var i = 0; i < this.layouts.length; i++) {
      if (this.layouts[i]) {
        nodes = nodes.concat(this.layouts[i]);
      }
    }

    return nodes;
  },

  comparison: function(x, y) {
    return  JSON.stringify(x) === JSON.stringify(y) ;
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
  }
};

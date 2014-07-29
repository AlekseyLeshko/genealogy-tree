GenealogyTree = function(nodes, relationships, rootRelationships) {
  this.nodes = nodes;
  this.relationships = relationships;
  this.rootRelationships = rootRelationships;

  this.options = this.getDefaultOptions();
  this.level = 1;
  this.dataLayouts = [];
  this.layouts = [];
};

GenealogyTree.prototype = {
  getStartLevel: function () {
    var startlevel = 1;
    return startlevel;
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
    var nodeArr = this.findNodesById(this.dataLayouts[this.level]);
    this.rootRelationships = this.getRelationships(nodeArr);
  },

  needToCreateNextLayout: function() {
    var answer = false;
    var nextLeval = this.level + 1;
    if (this.dataLayouts[nextLeval] && this.dataLayouts[nextLeval].length > 0) {
      answer = true;
    }
    return answer;
  },

  generationLayout: function() {
    _.each(this.rootRelationships, this.preparationRelationship, this);
  },

  preparationRelationship: function(relationship) {
    this.addSpousesNodeToLayout(relationship);
    this.addNodesForLayoutData(relationship.children)
    this.createEdge();

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

  getDefaultOptions: function() {
    var defaultOptions = {
      container: {
        width: 500,
        height: 500
      },
      frame: {
        width: 250,
        height: 250
      },
      indents: {
        indentX: 100,
        indentY: 100
      },
      stepX: 75,
      stepY: 100,
      nodeWidth: 30
    };
    return defaultOptions;
  },

  calcCoordinatesForLayout: function(arr) {
    var layout = [];
    var y = this.calcStartY(arr.length);
    var x = this.calcLayoutLevelX();
    for (var i = 0; i < arr.length; i++) {
      var node = this.clone(arr[i]);
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

  calcLayoutLevelX: function() {
    var x = this.level * this.options.stepX;
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

  findNodesById: function(ids) {
    var key = 'id';
    var arr = [];
    for (var i = 0; i < ids.length; i++) {
      var val = ids[i];
      var node = this.findElementInArr(key, val, this.nodes);
      arr.push(node);
    }
    return arr;
  },

  createEdge: function() {
    // console.error('Implementation!');
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
    var layoutWidth = this.widthCalculationLayout();
    var frame = this.options.frame.width * 2;
    var indent = this.options.indents.indentX * 2;

    return layoutWidth + frame + indent;
  }
};

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
    this.layouts = [1, 2];
  },

  generationLauout: function() {
    _.each(this.rootRelationships, this.relationshipProcessor, this);
  },

  relationshipProcessor: function(relationship) {
    this.addSpousesNodeToLayout(relationship);
    this.addNodesForLayoutData(relationship.children)
    this.createEdge();

    this.unsetRelationship(relationship);
  },

  addSpousesNodeToLayout: function(relationship) {
    var layout = [];

    var wifeNode = this.getNodeOfRelationship(relationship.wife, this.nodes);
    var husbandNode = this.getNodeOfRelationship(relationship.husband, this.nodes);
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
      stepX: 75,
      stepY: 100,
      nodeWidth: 30
    };
    return defaultOptions;
  },

  createLayoutLevel: function(nodeArr, level) {
    var layout = [];
    var y = this.calcStartY(nodeArr.length, this.options.nodeWidth);
    var x = this.calcLayoutLevelX(level);
    for (var i = 0; i < nodeArr.length; i++) {
      var node = this.clone(nodeArr[i]);
      node.x = x;
      node.y = y;
      layout.push(node);
      y += this.options.stepY;
    }
    return layout;
  },

  calcStartY: function(countNode, widthNode) {
    var y = (((countNode / 2) * widthNode) + ((countNode - 1) * this.options.stepY)) / 2;
    var res = (this.options.container.width / 2) - y;
    return res;
  },

  calcLayoutLevelX: function(level) {
    var x = level * this.options.stepX;
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

  createLayouts: function(rootRelationships, nodes, relationships) {
    do {
      this.layouts.push(this.generationLauout());
      if (this.dataLayouts.length > 0) {

        var nodeArr = this.findNodesById(this.dataLayouts, nodes);
        rootRelationships = this.getRelationships(nodeArr, relationships);
        this.dataLayouts.length = 0;
      } else {
        break;
      }
    } while(true);

    return this.layouts;
  },

  getRelationships: function(nodes, relationships) {
    var key = 'id';
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var relationship = this.findElementInArr(key, node.relationship, relationships);

      if (!this.findElementInArr(key, relationship.id, arr)) {
        arr.push(relationship);
      }
    }
    return arr;
  },

  findNodesById: function(ids, nodes) {
    var key = 'id';
    var arr = [];
    for (var i = 0; i < ids.length; i++) {
      var val = ids[i];
      var node = this.findElementInArr(key, val, nodes);
      arr.push(node);
    }
    return arr;
  },

  createEdge: function() {
    // console.error('Implementation!');
  },

  getNodeOfRelationship: function(val, nodes) {
    var key = 'id';
    var node = this.findElementInArr(key, val, nodes);
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
      nodes = nodes.concat(this.layouts[i]);
    }

    return nodes;
  },

  comparison: function(x, y) {
    return  JSON.stringify(x) === JSON.stringify(y) ;
  }
};

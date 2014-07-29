GenealogyTree = function(nodes, relationships) {
  this.nodes = nodes;
  this.relationships = relationships;

  this.options = this.getDefaultOptions();
};

GenealogyTree.prototype = {
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
    this.layouts = [];

    do {
      this.layouts.push(this.craeteLayout(rootRelationships, nodes, relationships));
      if (this.children.length > 0) {

        var nodeArr = this.findNodesById(this.children, nodes);
        rootRelationships = this.getRelationships(nodeArr, relationships);
        this.children.length = 0;
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

  craeteLayout: function(rootRelationships, nodes, relationships) {
    var key = 'id';
    var layout = [];
    this.children = [];

    for (var i = 0; i < rootRelationships.length; i++) {
      var relationship = rootRelationships[i];

      var wifeNode = this.getNodeOfRelationship(relationship.wife, nodes);
      var husbandNode = this.getNodeOfRelationship(relationship.husband, nodes);
      layout.push(wifeNode);
      layout.push(husbandNode);
      this.createEdge();
      this.children = this.children.concat(relationship.children);
      this.unsetValInArr(relationship, relationships);
    }
     layout = this.createLayoutLevel(layout, this.layouts.length);

    return layout
  },

  createEdge: function() {
    // console.error('Implementation!');
  },

  getNodeOfRelationship: function(val, nodes) {
    var key = 'id';
    var node = this.findElementInArr(key, val, nodes);
    return node;
  },

  unsetValInArr: function(value, arr) {
    var index = arr.indexOf(value);
    if(index != -1) {
      return arr.splice(index, 1);
    }
  },

  getNodes: function() {
    var nodes = [];
    for (var i = 0; i < this.layouts.length; i++) {
      nodes = nodes.concat(this.layouts[i]);
    }

    return nodes;
  }
};

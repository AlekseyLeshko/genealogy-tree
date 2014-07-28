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
      width: 500,
      height: 500,
      stepX: 50,
      stepY: 50
    };
    return defaultOptions;
  },

  createLayoutLevel: function(nodeArr, level) {
    var layout = [];
    var y = this.calcStartY(nodeArr.length, nodeArr[0].width);
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
    var y = (countNode * widthNode) + ((countNode - 1) * this.options.stepY);
    return this.options.width - y;
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

  createLayouts: function(roots, nodes, relationships) {
    this.layouts = [];

    do {
      this.layouts.push(this.craeteLayout(roots, nodes, relationships));
      if (this.children.length > 0) {
        var nodeArr = this.getNodes(this.children, nodes);
        roots = getRelationships(nodeArr, relationships);
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

  getNodes: function(ids, nodes) {
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
      var id = rootRelationships[i];
      var relationship = this.findElementInArr(key, id, relationships);

      var wifeNode = this.getNodeOfRelationship(relationship.wife, nodes);
      var husbandNode = this.getNodeOfRelationship(relationship.husband, nodes);
      layout.push(wifeNode);
      layout.push(husbandNode);
      this.createEdge();
      this.children = this.children.concat(relationship.children);
      this.unsetValInArr(relationship, relationships);
    }

    return layout
  },

  createEdge: function() {
    console.error('Implementation!');
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
  }
};

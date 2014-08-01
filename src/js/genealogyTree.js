var GenealogyTree = function(nodes, relationships, rootRelationships) {
  this.init();

  this.nodes = nodes;
  this.relationships = relationships;
  this.dataLayouts[this.level] = rootRelationships;
};

GenealogyTree.prototype = {
  init: function() {
    this.level = 0;
    this.dataLayouts = [];
    this.layouts = [];
    this.edges = [];
  },

  generationTree: function() {
    this.layouts.length = 3;

    this.generationLayouts();
  },

  generationLayouts: function() {
    _.each(this.dataLayouts, function(dataLayout) {
      this.generationLayout(dataLayout);
    }, this);
  },

  generationLayout: function(dataLayout) {
    console.log(dataLayout);
    _.each(dataLayout, this.preparationRelationship, this);
  },

  preparationNextLayout: function() {
    this.level++;
    // var nodeArr = this.findNodesByIds(this.dataLayouts[this.level]);
    // this.dataLayouts[this.level] = this.getRelationships(nodeArr);
  },

  needToCreateNextLayout: function() {
    return this.nextLayoutIsExists();
  },

  nextLayoutIsExists: function() {
    var nextLeval = this.level + 1;

    if (!this.dataLayouts[nextLeval] ||
      !(this.dataLayouts[nextLeval].length > 0)) {
      return false;
    }

    return true;
  },

  preparationRelationship: function(relationship) {
    this.addSpousesNodeToLayout(relationship);
    this.addNodesForLayoutData(relationship.children);
    // this.createEdges(relationship);

    this.unsetRelationship(relationship);
  },

  addSpousesNodeToLayout: function(relationship) {
    var layout = [];

    _.each(relationship.spouses, function(id) {
      var node = this.getNodeOfRelationship(id);
      layout.push(node);
    });

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
    var nodes = [];

    _.each(ids, function(id) {
      var node = _.where(this.nodes, {id: id});
      nodes.push(node);
    });

    return nodes;
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
  }
};

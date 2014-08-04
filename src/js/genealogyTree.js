var GenealogyTree = function(dataNodes, relationships, rootIds) {
  this.init();

  this.nodes = this.createNodes(dataNodes);
  this.relationships = relationships;
  this.dataLayouts[this.level] = rootIds;
};

GenealogyTree.prototype = {
  init: function() {
    this.level = 0;
    this.dataLayouts = [];
    this.layouts = [];
    this.edges = [];
  },

  generationLayouts: function() {
    do {
      this.preparationLayout();
      var dataLayout = this.dataLayouts[this.level];
      this.generationLayout(dataLayout);
      if (!this.needToCreateNextLayout()) {
        break;
      }
      this.level++;
    } while(true);
  },

  generationLayout: function(data) {
    _.each(data.relationships, this.preparationRelationship, this);
    this.addNodesForLayout(data.nodes, this.layouts, this.level);
  },

  preparationLayout: function() {
    var ids = this.dataLayouts[this.level];
    this.dataLayouts[this.level] = this.getRelationshipsAndNodes(ids);
  },

  needToCreateNextLayout: function() {
    return this.nextLayoutIsExists();
  },

  nextLayoutIsExists: function() {
    var nextLeval = this.level + 1;

    if (!this.dataLayouts[nextLeval] ||
      this.dataLayouts[nextLeval].length === 0) {
      return false;
    }

    return true;
  },

  preparationRelationship: function(relationship) {
    this.addSpousesNodeToLayout(relationship);
    this.addNodesForLayout(relationship.children, this.dataLayouts, this.level + 1);
    this.createEdges(relationship);

    this.unsetRelationship(relationship);
  },

  addSpousesNodeToLayout: function(relationship) {
    var nodes = this.findNodesByIds(relationship.spouses);
    this.addNodesForLayout(nodes, this.layouts, this.level);
  },

  addNodesForLayout: function(nodes, arr, level) {
    var layout = arr[level];
    if (!layout) {
      layout = [];
    }

    layout = layout.concat(nodes);

    arr[level] = layout;
  },

  getRelationshipsAndNodes: function(ids) {
    var arr = [];
    _.each(this.relationships, function(relationship) {
      for (var i = 0; i < relationship.spouses.length; i++) {
        var spouseId = relationship.spouses[i];
        if (_.contains(ids, spouseId)) {
          arr.push(relationship);
          ids = _.without(ids, spouseId);
        }
      }
    });

    var data = {
      relationships: _.uniq(arr),
      nodes: this.findNodesByIds(ids)
    };

    return data;
  },

  findNodesByIds: function(ids) {
    var nodes = [];

    _.each(ids, function(id) {
      var node = _.findWhere(this.nodes, {'id': id});
      nodes.push(node);
    }, this);
    return nodes;
  },

  createEdges: function(relationship) {
    var edgeArr = [];
    var parents = this.findNodesByIds(relationship.spouses);

    var parentEdge = new Edge(_.first(parents),
      _.last(parents), relationship.type);
    edgeArr.push(parentEdge);

    var children = this.findNodesByIds(relationship.children);

    _.each(children, function(node) {
      var edge = new Edge(parentEdge, node, relationship.childrenType);
      edgeArr.push(edge);
      node.updateToChildNode(parents, edge);
    }, this);

    this.edges = this.edges.concat(edgeArr);

    _.first(parents).updateToParentNode(children, edgeArr);
    _.last(parents).updateToParentNode(children, edgeArr);
  },

  updateNode: function(node, parents, children, edges) {
    node.parents = parents;
    node.children = children;
    node.edges = edges;
  },

  unsetRelationship: function(value) {
    var self = this;
    var index = _.find(this.relationships, function(obj) {
      self.comparison(obj, value);
    });

    return this.relationships.splice(index, 1);
  },

  getNodes: function() {
    var nodes = _.flatten(this.layouts);
    return nodes;
  },

  comparison: function(x, y) {
    return JSON.stringify(x) === JSON.stringify(y) ;
  },

  createNodes: function(dataNodes) {
    var arr = [];
    _.each(dataNodes, function(data) {
      var node = new Node(data);
      arr.push(node);
    });

    return arr;
  }
};

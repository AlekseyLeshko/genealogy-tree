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
    this.buildGenealogyPathFromAdam = this.partial(this.buildGenealogyPath, this.getAdamNode, this);
  },

  generation: function() {
    this.generationLayouts();

    this.gtClal = new GenealogyTreeCalculator(this.layouts, this.edges);
    this.gtClal.calcContainerParameters();
    this.gtClal.calcCoordinatesForLayouts();
  },

  getContainerParameters: function() {
    var parameters = {
      width: this.gtClal.options.container.width,
      height: this.gtClal.options.container.height
    };

    return parameters;
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
  },

  render: function(svgContainer) {
    this.svgContainer = svgContainer;
    this.renderEdges();
    this.renderNodes();
  },

  renderNodes: function() {
    this.renderNodeContainers();
    this.renderNodeImgs();
    this.renderNodelabels();
    this.renderSymbols();
  },

  renderNodeContainers: function() {
    var self = this;

    this.svgNodes = this.svgContainer
      .selectAll('.node')
      .data(this.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
  },

  renderNodeImgs: function() {
    this.svgNodes
      .append('svg:image')
      .attr('class', 'img')
      .attr('xlink:href', function(node) {
        var filePath = 'img/' + node.gender + '.png';
        return filePath;
      })
      .attr('width', function(node) {
        return node.width;
      })
      .attr('height', function(node) {
        return node.height;
      })
      .attr('y', function(node) {
        if (node.gender === 'female') {
          return 4.5;
        }
      })
      .attr('x', function(node) {
        if (node.gender === 'female') {
          return -0.5;
        }
      });
  },

  partial: function(fn, lastNode, context) {
    return function(firstNode) {
      return fn(firstNode, lastNode(), context);
    };
  },

  getAdamNode: function() {
    var name = 'Adam';
    var node = _.findWhere(this.nodes, { name: name });
    return node;
  },

  buildGenealogyPath: function(firstNode, lastNode, context) {
    context.deactivatePath();
    context.buildPartOfGenealogyPath(firstNode, lastNode);
  },

  isEndBuildGenealogyPath: function(firstNode, lastNode) {
    if (firstNode === lastNode) {
      return true;
    }
    if (firstNode.parents.length === 0) {
      return true;
    }
    return false;
  },

  buildPartOfGenealogyPath: function(firstNode, lastNode) {
    if (this.isEndBuildGenealogyPath(firstNode, lastNode)) {
      return;
    }
    var color = '#FF0000';

    var parent = _.first(firstNode.parents);
    var a = _.findWhere(this.edges, { parent: parent });
    a.setColor(color);

    var b = _.findWhere(this.edges, { child: firstNode });
    b.setColor(color);

    this.buildPartOfGenealogyPath(parent, lastNode);
  },

  deactivatePath: function() {
    _.each(this.edges, function(edge) {
      edge.setColor();
    });
  },

  renderNodelabels: function() {
    this.svgNodes
      .append('text')
      .attr('class', 'label')
      .attr('y', 30)
      .text(function(d) { return d.name; });
  },

  renderSymbols: function() {
    this.svgNodes
      .filter(function(node) {
        return node.whetherDrawSymbol();
      })
      .append('text')
      .attr('class', 'symbol')
      .attr('dx', function(node) {
        return node.symbol.x;
      })
      .attr('y', function(node) {
        return node.symbol.y;
      })
      .text(function(node) {
        return node.symbol.text;
      });
  },

  renderEdges: function() {
    this.svgEdges = [];
    _.each(this.edges, function(edge) {
      var svgEdge = edge.render(this.svgContainer);
      this.svgEdges.push(svgEdge);
    }, this);
  }
};

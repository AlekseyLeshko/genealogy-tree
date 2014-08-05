var Node = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.gender = data.gender;
  this.isConcubine = data.isConcubine;
  this.isUnnamed = data.isUnnamed;
  this.isDeid = data.isDeid;
  this.weight = data.weight;
  this.width = this.getWidth();
  this.height = this.getHeight();

  this.parents = [];
  this.children = [];
  this.edges = [];

  this.type = 'Node';

  this.symbols = {
    concubine: {
      text: 'c',
      x: 7,
      y: 15
    }, unnamed: {
      text: '?',
      x: 7,
      y: 16
    },
  };
};

Node.prototype = {
  getType: function() {
    return this.type;
  },

  updateToParentNode: function(children, edges) {
    this.children = children;
    this.edges = edges;
  },

  updateToChildNode: function(parents, edges) {
    this.parents = parents;
    this.edges = this.edges.concat(edges);
  },

  getWidth: function() {
    var magicNum = 30;

    if (!this.width) {
      this.width = magicNum;
    }

    return this.width;
  },

  getHeight: function() {
    var magicNum = 30;

    if (!this.height) {
      this.height = magicNum;
    }

    return this.height;
  },

  render: function(svgContainer, svgNode) {
    this.svgContainer = svgContainer;
    this.svgNode = svgNode;
  },

  renderImgs: function() {
    this.svgNodes
      .append('svg:image')
      .attr('xlink:href', 'img/male.png')
      // .attr('x', '0')
      // .attr('y', '-30')
      .attr('width', '20')
      .attr('height', '20');
  },

  renderNodelabels: function() {
    this.svgNodes
      .append('text')
      .attr('y', 30)
      .text(function(d) { return d.name; });
  },

  renderSymbols: function() {
    var self = this;
    this.svgNodes.append('text')
      .filter(function(d) { return self.isNodeWithSymbol(d); })
      .attr('dx', function(d) { return self.getSymbol(d).x; })
      .attr('y', function(d) { return self.getSymbol(d).y; })
      .text(function(d) { return self.getSymbol(d).text; });
  },

  getSymbol: function(d) {
    if (d.isConcubine) {
      return this.symbols.concubine;
    }

    if (d.isUnnamed) {
      return this.symbols.unnamed;
    }
  },

  isNodeWithSymbol: function(d) {
    return d.isConcubine || d.isUnnamed;
  },
};

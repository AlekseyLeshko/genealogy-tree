var Render = function() {
  this.container = '#tree';

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

  this.defaultFocus = {
    x: 0,
    y: 0,
    scale: 1
  };

  this.createContainer();
};

Render.prototype = {
  createContainer: function() {
    this.width = 1000;
    this.height = 1000;

    this.svg = d3.select(this.container)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.wrapper = this.svg.append('g')
      .call(d3.behavior.zoom().scaleExtent([0.7, 3]).on('zoom', this.zoom()));

    this.main = this.wrapper.append('g')
      .attr('id', 'main');

    d3.select(self.frameElement).style("height", this.height + "px");
  },

  tree: function(gTree) {
    this.gTree = gTree;
    this.gTree.generation();

    this.configContainer();
    this.renderTree();
  },

  configContainer: function() {
    var width = this.gTree.gtClal.options.container.width;
    var height = this.gTree.gtClal.options.container.height;

    this.main.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height);
  },

  renderTree: function() {
    this.renderNodeContainers();
    this.renderNodeImgs();
    this.renderNodelabels();
    this.renderSymbols();
    this.renderEdges();
  },

  renderNodeContainers: function() {
    this.svgNodes = this.main.selectAll('.node')
      .data(this.gTree.nodes)
      .enter()
      .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
  },

  renderNodeImgs: function() {
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

  renderEdges: function() {
    _.each(this.gTree.edges, function(edge) {
      this.renderEdge(edge);
    }, this);
  },

  renderEdge: function(edge) {
    this.svgEdges = [];
    edge.calcCoordinates();

    if (edge.typeRelationship === 'marriage') {
      this.svgEdges.push(this.createLine(edge));
    } else {
      this.svgEdges.push(this.paintPolyline(edge));
    }
  },

  paintPolyline: function (edge) {
    var lineGraph = this.main.append('g')
    .on('mouseover', function() {
      d3.select(this).selectAll('polyline').style('stroke', 'red');
    })
    .on('mouseout', function() {
      d3.select(this).selectAll('polyline').style('stroke', 'black');
    })
    .append('polyline')
    .attr('points', edge.points)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    return lineGraph;
  },

  createLine: function(edge) {
    var line = this.main
      .append('g')
      .append('line')
      .attr('x1', edge.x1)
      .attr('y1', edge.y1)
      .attr('x2', edge.x2)
      .attr('y2', edge.y2)
      .attr('stroke-width', 2)
      .attr('stroke', 'black');

    return line;
  },

  zoom: function() {
    var self = this;
    return function() {
      self.main.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    };
  },

  calc: function(val, halfSide, scale) {
    var sum = ((val * scale) + halfSide);
    console.log('sum = ' + sum);

    var res = (this.width / 2) - sum;
    console.log('res = ' + res);
    return res;
  },

  focus: function(node) {
    var halfNodeWidth = 44;
    var halfNodeHeight = 32;
    var scale = 2;
    var x = this.calc(node.x, halfNodeWidth, scale);
    var y = this.calc(node.y, halfNodeHeight, scale);

    this._focus(x, y, scale);
  },

  _focus: function(x, y, scale) {
    this.cleanTransform(this.main);
    this.cleanTransform(this.wrapper);

    var str = 'translate(' + y + ', ' +  x +')scale(' + scale + ')';

    this.wrapper.attr('transform', str);
  },

  cleanTransform: function(el) {
    el.attr('transform', null);
  }
};

var Render = function(options) {
  this.options = $.extend(true, this.getDefaultOptions(), options);

  this.createContainer();

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
};

Render.prototype = {
  getDefaultOptions: function() {
    var defaultOptions = {
      container: {
        id: '#tree',
        width: 1000,
        height: 1000
      },
      zoom: [0.7, 3],
      focus: {
        scale: 2
      }
    };
    return defaultOptions;
  },

  createContainer: function() {
    this.svg = d3.select(this.options.container.id)
      .append('svg')
        .attr('width', this.options.container.width)
        .attr('height', this.options.container.height);

    var zoom = d3.behavior
      .zoom()
      .scaleExtent(this.options.zoom)
      .on('zoom', this.zoom());

    this.wrapper = this.svg.append('g')
      .call(zoom);

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

  renderTree: function() {
    this.renderNodeContainers();
    this.renderNodeImgs();
    this.renderNodelabels();
    this.renderSymbols();
    this.renderEdges();
  },

  renderNodeContainers: function() {
    this.svgNodes = this.main
      .selectAll('.node')
      .data(this.gTree.nodes)
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

  configContainer: function() {
    var parameters = this.gTree.getContainerParameters();

    this.main
      .append("rect")
      .attr("class", "overlay")
      .attr("width", parameters.width)
      .attr("height", parameters.height);
  },

  zoom: function() {
    var self = this;
    return function() {
      self.main.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    };
  },

  calcNewCoordinate: function(coordinate, nodeSide, containerSide) {
    var newCoordinate = coordinate * this.options.focus.scale;
    newCoordinate += (nodeSide * this.options.focus.scale) / 2;

    var newCoordinateAlignCenter = (containerSide / 2) - newCoordinate;
    return newCoordinateAlignCenter;
  },

  focusToNode: function(node) {
    var x = this.calcNewCoordinate(node.x, node.width, this.options.container.width);
    var y = this.calcNewCoordinate(node.y, node.height, this.options.container.height);

    this.focus(x, y);
  },

  focus: function(x, y) {
    this.cleanTransform(this.main);
    this.cleanTransform(this.wrapper);

    var val = 'translate(' + x + ', ' +  y +')scale(' +
      this.options.focus.scale + ')';

    this.wrapper.attr('transform', val);
  },

  cleanTransform: function(el) {
    el.attr('transform', null);
  }
};

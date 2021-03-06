var Render = function(options) {
  this.options = $.extend(true, this.getDefaultOptions(), options);

  this.createContainer();
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

  // TODO: minify!!
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
    gTree.render(this.main);
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

var Render = function(options) {
  this.options = _.extend(this.getDefaultOptions(), options);

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
  },

  zoom: function() {
    var self = this;
    return function() {
      self.main.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    };
  },

  calc: function(val, halfSide) {
    var sum = ((val * scale) + halfSide);
    console.log('sum = ' + sum);

    var res = (this.width / 2) - sum;
    console.log('res = ' + res);
    return res;
  },

  focusToNode: function(node) {
    var halfNodeWidth = 44;
    var halfNodeHeight = 32;
    var x = this.calc(node.x, halfNodeWidth);
    var y = this.calc(node.y, halfNodeHeight);

    this.focus(x, y, scale);
  },

  focus: function(x, y) {
    this.cleanTransform(this.main);
    this.cleanTransform(this.wrapper);

    var val = 'translate(' + y + ', ' +  x +')scale(' +
      this.options.focus.scale + ')';

    this.wrapper.attr('transform', val);
  },

  cleanTransform: function(el) {
    el.attr('transform', null);
  }
};

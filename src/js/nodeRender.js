var Render = function(nodes, svgContainer) {
  this.nodes = nodes;
  this.svgContainer = svgContainer;
};

Render.prototype = {
  renderTree: function() {
    this.renderNodeContainers();
    this.renderNodeImg();
  },

  renderNodeContainers: function() {
    this.svgNodes = this.svgContainer.selectAll('.node')
      .data(this.nodes)
      .enter()
      .append('g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
  },

  renderNodeImg: function() {
    this.svgNodes
      .append('svg:image')
      .attr('xlink:href', 'img/male.png')
      // .attr('x', '0')
      // .attr('y', '-30')
      .attr('width', '20')
      .attr('height', '20');
  }
};

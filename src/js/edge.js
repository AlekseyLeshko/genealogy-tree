var Edge = function(parent, child, type) {
  'use strict';
  this.parent = parent;
  this.child = child;
  this.typeRelationship = type;

  this.init();
};

Edge.prototype = {
  init: function() {
    var self = this;
    this.calcCoordinatesOfType = {
      'marriage': function() { self.calcCoordinatesTypeMarrige(); },
      'of_marriage': function() { self.calcCoordinatesTypeOfMarrige(); }
    };
  },

  calcCoordinates: function() {
    this.calcCoordinatesOfType[this.typeRelationship]();
  },

  calcCoordinatesTypeMarrige: function() {
    this.x1 = this.parent.x + 5;
    this.y1 = this.parent.y + 12;

    this.x2 = this.child.x + 15;
    this.y2 = this.child.y + 12;

    this.middle = this.x2 + ((this.x1 - this.x2) / 2);
  },

  calcCoordinatesTypeOfMarrige: function() {
    this.points = [];
    this.points.push(this.child.x + 9);
    this.points.push(this.child.y + 7);

    this.points.push(this.child.x + 9);
    this.points.push(this.child.y - 25);

    var dy = 50;
    dy *= this.child.y <= this.parent.middle ? 1 : -1;

    this.points.push(this.child.x + dy + 9);
    this.points.push(this.child.y - 25);

    this.points.push(this.child.x + dy + 9);
    this.points.push(this.child.y - 63);
  },

  render: function() {
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
  }
};

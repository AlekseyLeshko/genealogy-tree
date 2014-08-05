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
    this.renderOfType = {
      'marriage': function() { self.createLine(); },
      'of_marriage': function() { self.paintPolyline(); }
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

  render: function(svgContainer) {
    this.svgContainer = svgContainer;
    this.calcCoordinates();

    var svgEdge = this.renderOfType[this.typeRelationship]();
    return svgEdge;
  },

  createLine: function() {
    var self = this;
    var line = this.svgContainer
      .append('g')
      .attr('class', 'edge')
      .on('mouseover', function() {
        self.setColor(this, 'red', 'line');
      })
      .on('mouseout', function() {
        self.setColor(this, 'black', 'line');
      })
      .append('line')
      .attr('x1', this.x1)
      .attr('y1', this.y1)
      .attr('x2', this.x2)
      .attr('y2', this.y2)
      .attr('stroke-width', 2)
      .attr('stroke', 'black');

    return line;
  },

  paintPolyline: function (edge) {
    var self = this;
    var lineGraph = this.svgContainer
      .append('g')
      .attr('class', 'edge')
      .on('mouseover', function() {
        self.setColor(this, 'red', 'polyline');
      })
      .on('mouseout', function() {
        self.setColor(this, 'black', 'polyline');
      })
      .append('polyline')
      .attr('points', this.points)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    return lineGraph;
  },

  setColor: function(el, color, type) {
    d3.select(el).selectAll(type).style('stroke', color);
  }
};

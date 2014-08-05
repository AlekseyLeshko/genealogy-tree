var Edge = function(parent, child, type) {
  //nodes = [], type = ''
  'use strict';

  this.parent = parent;
  this.child = child;
  this.typeRelationship = type;

  this.init();
};

Edge.prototype = {
  init: function() {
    var self = this;
    this.methodOfType = {
      'marriage': {
        calculation: function() {
          return self.calcCoorTypeMarrige();
        },
        render: function() {
          return self.renderTypeMarrige();
        }
      },
      'of_marriage': {
        calculation: function() {
          return self.calcCoorTypeOfMarrige();
        },
        render: function() {
          return self.renderTypeOfMarrige();
        }
      }
    };

    this.createOptions();
  },

  createOptions: function(options) {
    var defaultOptions = {
      class: 'link',
      borderColor: 'black',
      strokeWidth: 1
    };

    this.options = $.extend(true, defaultOptions, options);
  },

  calcCoordinates: function() {
    this.methodOfType[this.typeRelationship].calculation();
  },

  calcCoorTypeMarrige: function() {
    var pairs = [];
    var dy = 11;
    var pair = {
      x: this.parent.x + 14,
      y: this.parent.y + dy
    };
    pairs.push(pair);
    pair = {
      x: this.child.x + 5,
      y: this.child.y + dy
    };
    pairs.push(pair);

    dy = 14;
    pair = {
      x: this.parent.x + 14,
      y: this.parent.y + dy
    };
    pairs.push(pair);
    pair = {
      x: this.child.x + 5,
      y: this.child.y + dy
    };
    pairs.push(pair);

    var middle = pairs[1].x + ((pairs[0].x - pairs[1].x) / 2);
    pair = {
      x: middle,
      y: this.parent.y + dy
    };
    pairs.push(pair);
    pair = {
      x: middle,
      y: this.child.y + dy + 50
    };
    pairs.push(pair);

    this.coordinates = {
      pairs: pairs,
      middle: middle
    };
  },

  calcCoorTypeOfMarrige: function() {
    var pairs = [];
    var dx = 10;
    var pair = {
      x: this.child.x + dx,
      y: this.child.y + 7
    };
    pairs.push(pair);

    pair = _.last(this.parent.coordinates.pairs);
    pairs.push(pair);

    this.coordinates = {
      pairs: pairs
    };
  },

  render: function(svgContainer) {
    this.svgContainer = svgContainer;
    this.calcCoordinates();

    var svgEdge = this.methodOfType[this.typeRelationship].render();
    return svgEdge;
  },

  renderTypeMarrige: function() {
    var self = this;
    var container = this.svgContainer
      .append('g')
      .attr('class', 'edge')
      .on('mouseover', function() {
        self.setColor(this, 'red', 'line');
      })
      .on('mouseout', function() {
        self.setColor(this, 'black', 'line');
      });
    this.createLine(container, this.coordinates.pairs.slice(0, 2));
    this.createLine(container, this.coordinates.pairs.slice(2, 4));
    this.createLine(container, this.coordinates.pairs.slice(4, 6));
  },

  renderTypeOfMarrige: function() {
    var self = this;
    var container = this.svgContainer
      .append('g')
      .attr('class', 'edge')
      .on('mouseover', function() {
        self.setColor(this, 'red', 'line');
      })
      .on('mouseout', function() {
        self.setColor(this, 'black', 'line');
      });

    this.createLine(container, this.coordinates.pairs.slice(0, 2));
  },

  createLine: function(container, pairs) {
    var border = 1;
    var borderColor = 'black';
    container
      .append('line')
      .attr('x1', pairs[0].x)
      .attr('y1', pairs[0].y)
      .attr('x2', pairs[1].x)
      .attr('y2', pairs[1].y)
      .attr('stroke-width', border)
      .attr('stroke', borderColor);
  },

  setColor: function(el, color, type) {
    d3.select(el).selectAll(type).style('stroke', color);
  }
};

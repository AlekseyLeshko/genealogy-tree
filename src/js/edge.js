var Edge = (function() {
  'use strict';
  var Edge = function(parent, child, type) {
    //nodes = [], type = ''

    this.parent = parent;
    this.child = child;
    this.typeRelationship = type;

    this.init();
  };

  Edge.prototype = {
    calcCoordinates: function() {
      this.methodOfType[this.typeRelationship].calculation();
    },

    render: function(svgContainer) {
      this.drawAndSetEdgeContainer(svgContainer);
      this.calcCoordinates();

      var svgEdge = this.methodOfType[this.typeRelationship].render();
      return svgEdge;
    },

    drawAndSetEdgeContainer: function(svgContainer) {
      this.container = svgContainer
        .append('g')
        .attr('class', this.options.class);
    },

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
        strokeColor: 'black',
        strokeWidth: 1
      };

      this.options = $.extend(true, defaultOptions, options);
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

    renderTypeMarrige: function() {
      this.drawLink(this.coordinates.pairs.slice(0, 2));
      this.drawLink(this.coordinates.pairs.slice(2, 4));
      this.drawLink(this.coordinates.pairs.slice(4, 6));
    },

    renderTypeOfMarrige: function() {
      this.drawLink(this.coordinates.pairs);
    },

    drawLink: function(pairs) {
      this.container
        .append('line')
        .attr('x1', pairs[0].x)
        .attr('y1', pairs[0].y)
        .attr('x2', pairs[1].x)
        .attr('y2', pairs[1].y)
        .attr('stroke-width', this.options.strokeWidth)
        .attr('stroke', this.options.strokeColor);
    }
  };

  return Edge;
})();

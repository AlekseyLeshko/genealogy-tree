Edge = function (parent, child, type) {
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
    }
  },

  calcCoordinates: function() {
    this.calcCoordinatesOfType[this.typeRelationship]();
  },

  calcCoordinatesTypeMarrige: function() {
    this.x1 = this.parent.y + 5;
    this.y1 = this.parent.x + 12;

    this.x2 = this.child.y + 15;
    this.y2 = this.child.x + 12;
  },

  calcCoordinatesTypeOfMarrige: function() {

  }
};

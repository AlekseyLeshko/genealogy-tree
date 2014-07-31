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

    this.middle = this.x2 + ((this.x1 - this.x2) / 2);
  },

  calcCoordinatesTypeOfMarrige: function() {
    this.points = [];
    this.points.push(this.child.y + 9);
    this.points.push(this.child.x + 7);

    this.points.push(this.child.y + 9);
    this.points.push(this.child.x - 25);

    var dy = 50;
    dy *= this.child.y <= this.parent.middle ? 1 : -1;

    this.points.push(this.child.y + dy + 9);
    this.points.push(this.child.x - 25);

    this.points.push(this.child.y + dy + 9);
    this.points.push(this.child.x - 63);
  }
};

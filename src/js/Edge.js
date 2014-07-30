Edge = function (parent, child, type) {
  this.parent = parent;
  this.child = child;
  this.typeRelationship = typesRelationship[type];

  this.init();
};

Edge.prototype = {
  init: function() {
  }
};

typesRelationship = {
  'marriage': 1,
  'of_marriage': 2
};

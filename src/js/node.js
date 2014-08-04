var Node = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.gender = data.gender;
  this.isConcubine = data.isConcubine;
  this.isUnnamed = data.isUnnamed;
  this.isDeid = data.isDeid;
  this.weight = data.weight;

  this.parents = [];
  this.children = [];
  this.edges = [];

  this.type = 'Node';
};

Node.prototype = {
  getType: function() {
    return this.type;
  },

  updateToParentNode: function(children, edges) {
    this.children = children;
    this.edges = edges;
  },

  updateToChildNode: function(parents, edges) {
    this.parents = parents;
    this.edges = this.edges.concat(edges);
  }
};

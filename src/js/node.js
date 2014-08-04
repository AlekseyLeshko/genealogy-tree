var Node = function(data, parents, children, edges) {
  this.id = data.id;
  this.name = data.name;
  this.gender = data.gender;
  this.isConcubine = data.isConcubine;
  this.isUnnamed = data.isUnnamed;
  this.isDeid = data.isDeid;
  this.weight = data.weight;

  this.parents = parents;
  this.children = children;
  this.edges = edges;

  this.type = 'Node';
};

Node.prototype = {
  getType: function() {
    return this.type;
  }
};

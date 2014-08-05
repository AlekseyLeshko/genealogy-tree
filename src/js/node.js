var Node = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.gender = data.gender;
  this.isConcubine = data.isConcubine;
  this.isUnnamed = data.isUnnamed;
  this.isDeid = data.isDeid;
  this.weight = data.weight;
  this.width = this.getWidth();
  this.height = this.getHeight();

  this.parents = [];
  this.children = [];
  this.edges = [];
  this.symbol = this.getSymbol();

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
  },

  getWidth: function() {
    var magicNum = 20;

    if (!this.width) {
      this.width = magicNum;
    }

    return this.width;
  },

  getHeight: function() {
    var magicNum = 20;

    if (!this.height) {
      this.height = magicNum;
    }

    return this.height;
  },

  getSymbol: function() {
    var symbols = {
      concubine: {
        text: 'c',
        x: 7,
        y: 15
      },
      unnamed: {
        text: '?',
        x: 7,
        y: 16
      }
    };

    for (var key in this) {
      var str = key.substr(2, key.length).toLowerCase();
      if (symbols[str] && this[key]) {
        return symbols[str];
      }
    }
  },

  whetherDrawSymbol: function() {
    var answer = this.isConcubine || this.isUnnamed;
    return answer;
  },
};

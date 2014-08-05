function getNodes() {
  var nodes = [{
    'id': 1,
    'name': 'Adam',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 100
  }, {
    'id': 2,
    'name': 'Eve',
    'gender': 'female',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 80
  }, {
    'id': 3,
    'name': 'Wife Seth',
    'gender': 'female',
    'isConcubine': false,
    'isUnnamed': true,
    'isDeid': false,
    'weight': 100
  }, {
    'id': 4,
    'name': 'Seth',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 80
  }, {
    'id': 5,
    'name': 'Abel',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': true,
    'weight': 60
  }, {
    'id': 6,
    'name': 'Cain',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 40
  }, {
    'id': 7,
    'name': 'Wife Cain',
    'gender': 'female',
    'isConcubine': false,
    'isUnnamed': true,
    'isDeid': false,
    'weight': 20
  }, {
    'id': 8,
    'name': 'Enos',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 100
  }, {
    'id': 9,
    'name': 'Enoch(1)',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 90
  }, {
    'id': 10,
    'name': 'Cainan',
    'gender': 'male',
    'isConcubine': true,
    'isUnnamed': false,
    'isDeid': false,
    'weight': 100
  }];

  return nodes;
};

function getRelationships() {
  var relationships = [{
    "id": 1,
    "level": 0,
    "spouses": [1, 2],
    "children": [3, 4, 5, 6, 7],
    "isLegitimateRelationships": true,
    "type": "marriage",
    "childrenType": "of_marriage"
  }, {
    "id": 2,
    "level": 1,
    "spouses": [3, 4],
    "children": [8],
    "isLegitimateRelationships": true,
    "type": "marriage",
    "childrenType": "of_marriage"
  }, {
    "id": 3,
    "level": 1,
    "spouses": [6, 7],
    "children": [9],
    "isLegitimateRelationships": true,
    "type": "marriage",
    "childrenType": "of_marriage"
  }, {
    "id": 4,
    "level": 2,
    "spouses": [8],
    "children": [10],
    "isLegitimateRelationships": true,
    "type": "marriage",
    "childrenType": "of_marriage"
  }];
  return relationships;
}

function getRootRelationships(){
  var rootRelationships = [1];
  return rootRelationships;
};

function getDefaultGenealogyTreeOptions() {
  var defaultOptions = {
    startLevel: 0
  };
  return defaultOptions;
};

function getGCalcOptions() {
  var defaultOptions = {
    frame: {
      width: 250,
      height: 250
    },
    stepX: 80,
    stepY: 50,
    nodeWidth: 30
  };
  return defaultOptions;
};

function getGenealogyTree() {
  var nodes = getNodes();
  var relationships = getRelationships();
  var rootRelationships = getRootRelationships();

  var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
  return gTree;
};

function getGenealogyTreeCalculator() {
  var layouts = [];
  var edges = [];

  var gtCalc = new GenealogyTreeCalculator(layouts, edges);
  return gtCalc;
};

function getCreatedGenealogyTree() {
  var gTree = getGenealogyTree();
  gTree.generationLayouts();

  return gTree;
};

function timer(obj, fun) {
  var data = {
    time: -1,
    f: function(arg) {
      var dataStart = Date.now();
      obj[fun](arg);
      var dataEnd = Date.now();
      data.time = dataEnd - dataStart;
      console.log(fun + ' time: ' + data.time);
    }
  };

  return data;
};

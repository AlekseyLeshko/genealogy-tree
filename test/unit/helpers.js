function getNodes() {
  var nodes = [{
    'id': 1,
    'name': 'Adam',
    'gender': 'male',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': false,
    'relationship': 1
  }, {
    'id': 2,
    'name': 'Eve',
    'gender': 'female',
    'isConcubine': false,
    'isUnnamed': false,
    'isDeid': true,
    'relationship': 1
  }, {
    'id': 3,
    'name': 'Wife Seth',
    'gender': 'female',
    'isConcubine': false,
    'isUnnamed': true,
    'isDeid': false,
    'relationship': 2
  }, {
    'id': 4,
    'name': 'Seth',
    'gender': 'male',
    'isConcubine': true,
    'isUnnamed': false,
    'isDeid': false,
    'relationship': 2
  }];

  return nodes;
};

function getRelationships() {
  var relationships = [{
    "id": 1,
    "husband": 1,
    "wife": 2,
    "isLegitimateRelationships": true,
    "children": [3, 4],
    "level": 1,
    "type": "marriage",
    "childrenType": "of_marriage"
  }, {
    "id": 2,
    "husband": 4,
    "wife": 3,
    "isLegitimateRelationships": true,
    "children": [],
    "level": 2,
    "type": "marriage",
    "childrenType": "of_marriage"
  }];
  return relationships;
}

function getRootRelationships(){
  var rootRelationships = getRelationships().slice(0, 1);
  return rootRelationships;
};

function getDefaultOptions() {
  var defaultOptions = {
    frame: {
      width: 250,
      height: 250
    },
    stepX: 75,
    stepY: 100,
    nodeWidth: 30,
    startLevel: 0
  };
  return defaultOptions;
};

function getOptions() {
  var defaultOptions = {
    container: {
      width: 500,
      height: 500
    },
    frame: {
      width: 250,
      height: 250
    },
    stepX: 75,
    stepY: 100,
    nodeWidth: 30,
    startLevel: 0
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

function getCreatedGenealogyTree() {
  var gTree = getGenealogyTree();
  gTree.generationLayouts();

  return gTree;
};

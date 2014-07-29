'use strict';

describe('Generation of genealogy tree structure', function() {
  it('create tree without parameters', function() {
    var gTree = new GenealogyTree();

    expect(gTree).not.toBeNull();
    expect(gTree.options).toEqual(getDefaultOptions());
    expect(gTree.nodes).toBeUndefined();
    expect(gTree.relationships).toBeUndefined();
  });

  it('create tree with parameters', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = getRootRelationships();

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);

    expect(gTree.options).toEqual(getDefaultOptions());
    expect(gTree.nodes.length).toEqual(nodes.length);
    expect(gTree.relationships.length).toEqual(relationships.length);
  });

  it('generation layouts', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = getRootRelationships();

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);

    gTree.generationLayouts();
    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(3);
    expect(layouts[1].length).toEqual(2);
    expect(layouts[2].length).toEqual(2);
  });

  it('generation layout', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = getRootRelationships();
    var length = relationships.length - 1;

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
    gTree.generationLayout();
    var layouts = gTree.layouts;

    expect(gTree.relationships.length).toEqual(length);

    expect(layouts.length).toEqual(2);
    expect(layouts[0]).toBeUndefined();
    expect(layouts[1].length).toEqual(2);
    expect(gTree.dataLayouts.length).toEqual(3);
    expect(gTree.dataLayouts[2].length).toEqual(2);
  });

  it('get default options', function() {
    var options = GenealogyTree.prototype.getDefaultOptions();

    expect(options).toEqual(getDefaultOptions());
  });

  it('get start level', function() {
    var startLevel = 1;
    var level = GenealogyTree.prototype.getStartLevel();

    expect(level).toEqual(startLevel);
  });

  it('add nodes for current layout', function() {
    var nodes = getNodes().slice(0, 2);
    var level = 1;

    GenealogyTree.prototype.level = level;
    GenealogyTree.prototype.layouts = [];

    GenealogyTree.prototype.addNodesForCurrentLayout(nodes);

    var arr = GenealogyTree.prototype.layouts;

    expect(arr.length).toEqual(2);
    expect(arr[1].length).toEqual(2);
  });

  it('add nodes for next layout', function() {
    var nodes = getNodes().slice(0, 2);
    var level = 1;

    GenealogyTree.prototype.level = level;
    GenealogyTree.prototype.dataLayouts = [];

    GenealogyTree.prototype.addNodesForLayoutData(nodes);

    var arr = GenealogyTree.prototype.dataLayouts;

    expect(arr.length).toEqual(3);
    expect(arr[2].length).toEqual(2);
  });

  it('create layout level', function() {
    var level = 2;
    var width = 30;
    var nodeArr = [{
      id: 1,
      width: width
    }, {
      id: 2,
      width: width
    }];
    var level = 2;

    GenealogyTree.prototype.level = level;
    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var layout = GenealogyTree.prototype.calcCoordinatesForLayout(nodeArr, level);

    var x = GenealogyTree.prototype.calcValX();
    var y = GenealogyTree.prototype.calcStartY(nodeArr.length);

    for (var i = 0; i < layout.length - 1; i++) {
      expect(layout[i].x).toEqual(x);
      expect(layout[i].y).toEqual(y);
      y += GenealogyTree.prototype.options.stepY;
    }
  });

  it('clone object', function() {
    var node = {
      id: 1,
      width: 20
    };

    var copy = GenealogyTree.prototype.clone(node);

    expect(copy).toEqual(node);
  });

  it('calculation start y', function() {
    var countNode = 2;
    var widthNode = 30;

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var y = GenealogyTree.prototype.calcStartY(countNode);

    var answer = 185;
    expect(y).toEqual(answer);
  });

  it('calculation layout level x', function() {
    var level = 2;

    GenealogyTree.prototype.level = level;
    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var x = GenealogyTree.prototype.calcValX();

    var answer = (level * GenealogyTree.prototype.options.stepX) +
      GenealogyTree.prototype.options.indents.indentX +
      GenealogyTree.prototype.options.frame.height;

    expect(x).toEqual(answer);
  });

  it('find element by id', function() {
    var arr = [{
      id: 1
    }, {
      id: 2
    }];

    var val = 2;
    var key = 'id';
    var obj = GenealogyTree.prototype.findElementInArr(key, val, arr);

    expect(obj[key]).toEqual(val);
  });

  it('get relationships', function() {
    var nodes = getNodes().slice(0, 2);

    GenealogyTree.prototype.relationships = getRelationships();
    var arr = GenealogyTree.prototype.getRelationships(nodes);

    expect(arr.length).toEqual(1);
  });

  it('get nodes by id', function() {
    var arrIds = [1, 2 ,3];

    GenealogyTree.prototype.nodes = getNodes()
    var nodes = GenealogyTree.prototype.findNodesById(arrIds);

    expect(nodes.length).toEqual(arrIds.length);
  });

  it('not finded element by id', function() {
    var arr = [{
      id: 1
    }, {
      id: 2
    }];

    var val = 3;
    var key = 'id';
    var obj = GenealogyTree.prototype.findElementInArr(key, val, arr);

    expect(obj).toBeUndefined();
  });

  it('get node of relationship', function() {
    var key = 'wife';

    var node = GenealogyTree.prototype.getNodeOfRelationship(getRelationships()[0][key]);

    expect(node).toEqual(getNodes()[1]);
  });

  it('get node of relationship not finded node', function() {
    var val = '-1';
    var node = GenealogyTree.prototype.getNodeOfRelationship(val, getNodes());

    expect(node).toBeUndefined();
  });

  it('unset val in relationships', function() {
    var relationships = getRelationships();
    var length = relationships.length;
    var val = relationships[0];

    GenealogyTree.prototype.relationships = relationships;
    var el = GenealogyTree.prototype.unsetRelationship(val);
    var arr = GenealogyTree.prototype.relationships;

    expect(el).toEqual([val]);
    expect(arr.length).toEqual(length - 1);
  });

  it('get nodes', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = getRootRelationships();

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
    gTree.generationLayouts();
    var nodes = gTree.getNodes();

    expect(nodes.length).toEqual(4);
  });

  it('comparison objects', function() {
    var x = { a: 1, b: 2};
    var y = { a: 1, b: 2};

    var res = GenealogyTree.prototype.comparison(x, y);

    expect(res).toBe(true);
  });

  it('add spouses node to layout', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var val = relationships[0];
    var rootRelationships = getRootRelationships();

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships)
    gTree.addSpousesNodeToLayout(val);
    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(2);
    expect(layouts[0]).toBeUndefined();
    expect(layouts[1].length).toEqual(2);
  });

  it('need create next layout when data layout is empty', function() {
    var level = 1;
    GenealogyTree.prototype.dataLayouts = [];

    var answer = GenealogyTree.prototype.needToCreateNextLayout();

    expect(answer).toBe(false);
  });

  it('need craete next layout when data layout is not empty', function() {
    var level = 1;
    GenealogyTree.prototype.dataLayouts = [[], [], getNodes()];

    GenealogyTree.prototype.level = level;
    var answer = GenealogyTree.prototype.needToCreateNextLayout();

    expect(answer).toBe(true);
  });

  it('calculation width container for empty layout', function() {
    GenealogyTree.prototype.layouts = [];
    GenealogyTree.prototype.options = getDefaultOptions();
    var width = GenealogyTree.prototype.calcWidthСontainer();

    expect(width).toEqual(700);
  });

  it('calculation width container for layout', function() {
    GenealogyTree.prototype.layouts = [getNodes()];
    GenealogyTree.prototype.options = getDefaultOptions();
    var width = GenealogyTree.prototype.calcWidthСontainer();

    expect(width).toEqual(1120);
  });

  it('width calculation layout', function() {
    GenealogyTree.prototype.layouts = [undefined, [], getNodes()];
    GenealogyTree.prototype.options = getDefaultOptions();
    var width = GenealogyTree.prototype.widthCalculationLayout();

    expect(width).toEqual(420);
  });

  it('width calculation layout when layouts is empty', function() {
    GenealogyTree.prototype.layouts = [];
    GenealogyTree.prototype.options = getDefaultOptions();
    var width = GenealogyTree.prototype.widthCalculationLayout();

    expect(width).toEqual(0);
  });

  it('width calculation layout when layout is undefined', function() {
    GenealogyTree.prototype.layouts = [undefined];
    GenealogyTree.prototype.options = getDefaultOptions();
    var width = GenealogyTree.prototype.widthCalculationLayout();

    expect(width).toEqual(0);
  });

  it('calculation height container', function() {
    GenealogyTree.prototype.layouts = [1];
    var height = GenealogyTree.prototype.calcHeightСontainer();

    expect(height).toEqual(800);
  });
});

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
    'id': 1,
    'husband': 1,
    'wife': 2,
    'isLegitimateRelationships': true,
    'children': [3, 4]
  }, {
    'id': 2,
    'husband': 4,
    'wife': 3,
    'isLegitimateRelationships': true,
    'children': []
  }];
  return relationships;
}

function getRootRelationships(){
  var rootRelationships = getRelationships().slice(0, 1);
  return rootRelationships;
};

function getDefaultOptions() {
  var defaultOptions = {
    container: {
      width: 500,
      height: 500
    },
    frame: {
      width: 250,
      height: 250
    },
    indents: {
      indentX: 100,
      indentY: 100
    },
    stepX: 75,
    stepY: 100,
    nodeWidth: 30
  };
  return defaultOptions;
};

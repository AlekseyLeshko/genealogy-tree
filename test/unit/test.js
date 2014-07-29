'use strict';

describe("Genealogy tree", function() {
  it("create tree without parameters", function() {
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

  // it("generation layouts", function() {
  //   GenealogyTree.prototype.generationLauouts();
  //   var layouts = GenealogyTree.prototype.layouts;

  //   // expect(layouts.length).toEqual(2);
  //   // expect(layouts[0].length).toEqual(2);
  //   // expect(layouts[1].length).toEqual(2);
  // });

  // it("create layouts", function() {
  //   var rootRelationships = getRelationships().slice(0, 1);

  //   var layouts = GenealogyTree.prototype.createLayouts(rootRelationships, getNodes(), getRelationships());

  //   expect(layouts.length).toEqual(2);
  //   expect(layouts[0].length).toEqual(2);
  //   expect(layouts[1].length).toEqual(2);
  // });

  it("generation layout", function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = getRootRelationships();
    var length = relationships.length - 1;

    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
    gTree.generationLauout();
    var layouts = gTree.layouts;

    expect(gTree.relationships.length).toEqual(length);

    expect(layouts.length).toEqual(2);
    expect(layouts[0]).toBeUndefined();
    expect(layouts[1].length).toEqual(2);
    expect(gTree.dataLayouts.length).toEqual(3);
    expect(gTree.dataLayouts[2].length).toEqual(2);
  });

  it("get default options", function() {
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

  it("create layout level", function() {
    var level = 2;
    var width = 30;
    var nodeArr = [{
      id: 1,
      width: width
    }, {
      id: 2,
      width: width
    }];

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var layout = GenealogyTree.prototype.createLayoutLevel(nodeArr, level);

    var x = GenealogyTree.prototype.calcLayoutLevelX(level);
    var y = GenealogyTree.prototype.calcStartY(nodeArr.length, width);

    for (var i = 0; i < layout.length - 1; i++) {
      expect(layout[i].x).toEqual(x);
      expect(layout[i].y).toEqual(y);
      y += GenealogyTree.prototype.options.stepY;
    }
  });

  it("clone object", function() {
    var node = {
      id: 1,
      width: 20
    };

    var copy = GenealogyTree.prototype.clone(node);

    expect(copy).toEqual(node);
  });

  it("calculation start y", function() {
    var countNode = 2;
    var widthNode = 50;

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var y = GenealogyTree.prototype.calcStartY(countNode, widthNode);

    var answer = 175;
    expect(y).toEqual(answer);
  });

  it("calculation layout level x", function() {
    var level = 2;

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var x = GenealogyTree.prototype.calcLayoutLevelX(level);

    var answer = 2 * GenealogyTree.prototype.options.stepX;
    expect(x).toEqual(answer);
  });

  it("find element by id", function() {
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

  it("get relationships", function() {
    var nodes = getNodes().slice(0, 2);

    var arr = GenealogyTree.prototype.getRelationships(nodes, getRelationships());

    expect(arr.length).toEqual(1);
  });

  it("get nodes", function() {
    var arrIds = [1, 2 ,3];

    var nodes = GenealogyTree.prototype.findNodesById(arrIds, getNodes());

    expect(nodes.length).toEqual(arrIds.length);
  });

  it("not finded element by id", function() {
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

  it("get node of relationship", function() {
    var key = 'wife';
    var node = GenealogyTree.prototype.getNodeOfRelationship(getRelationships()[0][key], getNodes());

    expect(node).toEqual(getNodes()[1]);
  });

  it("get node of relationship not finded node", function() {
    var val = '-1';
    var node = GenealogyTree.prototype.getNodeOfRelationship(val, getNodes());

    expect(node).toBeUndefined();
  });

  it("unset val in relationships", function() {
    var relationships = getRelationships();
    var length = relationships.length;
    var val = relationships[0];

    GenealogyTree.prototype.relationships = relationships;
    var el = GenealogyTree.prototype.unsetRelationship(val);
    var arr = GenealogyTree.prototype.relationships;

    expect(el).toEqual([val]);
    expect(arr.length).toEqual(length - 1);
  });

  // it("get nodes", function() {
  //   var rootRelationships = getRelationships().slice(0, 1);

  //   var layouts = GenealogyTree.prototype.createLayouts(rootRelationships, getNodes(), getRelationships());
  //   var nodes = GenealogyTree.prototype.getNodes();

  //   expect(nodes.length).toEqual(4);
  // });

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
  })
});

function getNodes() {
  var nodes = [{
    "id": 1,
    "name": "Adam",
    "gender": "male",
    "isConcubine": false,
    "isUnnamed": false,
    "isDeid": false,
    "relationship": 1
  }, {
    "id": 2,
    "name": "Eve",
    "gender": "female",
    "isConcubine": false,
    "isUnnamed": false,
    "isDeid": true,
    "relationship": 1
  }, {
    "id": 3,
    "name": "Wife Seth",
    "gender": "female",
    "isConcubine": false,
    "isUnnamed": true,
    "isDeid": false,
    "relationship": 2
  }, {
    "id": 4,
    "name": "Seth",
    "gender": "male",
    "isConcubine": true,
    "isUnnamed": false,
    "isDeid": false,
    "relationship": 2
  }];

  return nodes;
};

function getRelationships() {
  var relationships = [{
    "id": 1,
    "husband": 1,
    "wife": 2,
    "isLegitimateRelationships": true,
    "children": [3, 4]
  }, {
    "id": 2,
    "husband": 4,
    "wife": 3,
    "isLegitimateRelationships": true,
    "children": []
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
    stepX: 75,
    stepY: 100,
    nodeWidth: 30
  };
  return defaultOptions;
};

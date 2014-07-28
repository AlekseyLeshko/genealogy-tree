'use strict';

describe("Genealogy tree", function() {
  it("create ", function() {
    var gTree = new GenealogyTree();
    expect(gTree).not.toBeNull();
    expect(gTree.options).not.toBeUndefined();
    expect(gTree.options).toEqual(GenealogyTree.prototype.getDefaultOptions());
  });

  it("get default options", function() {
    var defaultWidth = 700;
    var defaultHeight = 700;
    var stepX = 75;
    var stepY = 100;

    var options = GenealogyTree.prototype.getDefaultOptions();

    expect(options).not.toBeNull();
    expect(options.container).not.toBeUndefined();
    expect(options.container.width).toEqual(defaultWidth);
    expect(options.container.height).toEqual(defaultHeight);
    expect(options.stepY).toEqual(stepY);
    expect(options.stepX).toEqual(stepX);
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

  it("create layouts", function() {
    var rootRelationships = getRelationships().slice(0, 1);

    var layouts = GenealogyTree.prototype.createLayouts(rootRelationships, getNodes(), getRelationships());

    expect(layouts.length).toEqual(2);
    expect(layouts[0].length).toEqual(2);
    expect(layouts[1].length).toEqual(2);
  });

  it("create layout", function() {
    var rootRelationships = getRelationships();

    var layout = GenealogyTree.prototype.craeteLayout(rootRelationships, getNodes(), getRelationships());

    expect(layout.length).toEqual(4)
    expect(GenealogyTree.prototype.children.length).toEqual(2);
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

  it("unset val in simple arr", function() {
    var arr = [1, 2, 3, 4, 5];
    var length = arr.length;
    var val = 3;

    var res = GenealogyTree.prototype.unsetValInArr(val, arr);

    expect(res).toEqual([val]);
    expect(arr.length).toEqual(length - 1);
  });

  it("unset val in object arr", function() {
    var arr = [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }];
    var length = arr.length;
    var val = arr[1];

    var res = GenealogyTree.prototype.unsetValInArr(val, arr);

    expect(res).toEqual([val]);
    expect(arr.length).toEqual(length - 1);
  });

  it("get nodes", function() {
    var rootRelationships = getRelationships().slice(0, 1);

    var layouts = GenealogyTree.prototype.createLayouts(rootRelationships, getNodes(), getRelationships());
    var nodes = GenealogyTree.prototype.getNodes();

    expect(nodes.length).toEqual(4);
  });
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

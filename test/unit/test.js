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
    var stepX = 50;
    var stepY = 50;

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
    var width = 50;
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

    var answer = 350;
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
    var rootNodes = [1, 2];

    var layouts = GenealogyTree.prototype.createLayouts(rootNodes, getNodes(), getRelationships());
    expect(layouts[0].length).toEqual(2);
  });

  it("find element by id", function() {
    var arr = [{
      id: 1
    }, {
      id: 2
    }];

    var val = 2;
    var key = 'id';
    var obj = GenealogyTree.prototype.findElement(key, val, arr);

    expect(obj[key]).toEqual(val);
  });

  it("not finded element by id", function() {
    var arr = [{
      id: 1
    }, {
      id: 2
    }];

    var val = 3;
    var key = 'id';
    var obj = GenealogyTree.prototype.findElement(key, val, arr);

    expect(obj).toBeUndefined();
  });

  it("get node of relationship", function() {
    var key = 'wife';
    var node = GenealogyTree.prototype.getNodeOfRelationship(getRelationships()[0][key], getNodes());

    expect(node).toEqual(getNodes()[1]);
  });
});

function getNodes() {
  var nodes = [{
    "id": 1,
    "name": "Adam",
    "gender": "male",
    "isConcubine": false,
    "isUnnamed": false,
    "isDeid": false
  }, {
    "id": 2,
    "name": "Eve",
    "gender": "female",
    "isConcubine": false,
    "isUnnamed": false,
    "isDeid": true
  }, {
    "id": 3,
    "name": "Wife Seth",
    "gender": "female",
    "isConcubine": false,
    "isUnnamed": true,
    "isDeid": false
  }, {
    "id": 4,
    "name": "Seth",
    "gender": "male",
    "isConcubine": true,
    "isUnnamed": false,
    "isDeid": false
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

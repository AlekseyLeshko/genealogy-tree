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
    var width = 50;
    var nodeArr = [{
      id: 1,
      width: width
    }, {
      id: 2,
      width: width
    }];

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var layout = GenealogyTree.prototype.createLayoutLevel(nodeArr);

    for (var i = 0; i < layout.length; i++) {
      expect(layout[i].x).not.toBeUndefined();
      expect(layout[i].y).not.toBeUndefined();
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

  it("calculation start x", function() {
    var countNode = 2;
    var widthNode = 50;

    GenealogyTree.prototype.options = GenealogyTree.prototype.getDefaultOptions();
    var x = GenealogyTree.prototype.calcStartX(countNode, widthNode);

    var answer = 850;
    expect(x).toEqual(answer);
  });
});

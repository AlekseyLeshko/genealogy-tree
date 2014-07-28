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
    var stepX = 70;
    var stepY = 70;

    var options = GenealogyTree.prototype.getDefaultOptions();

    expect(options).not.toBeNull();
    expect(options.container).not.toBeUndefined();
    expect(options.container.width).toEqual(defaultWidth);
    expect(options.container.height).toEqual(defaultHeight);
    expect(options.stepY).toEqual(stepY);
    expect(options.stepX).toEqual(stepX);
  });

  it("create layout level", function() {
    var nodeArr = [{
      id: 1,
      width: 20
    }, {
      id: 2,
      width: 20
    }];

    var nodeLayout = GenealogyTree.prototype.createLayoutLevel(nodeArr);
    console.log(nodeArr[0]);
    for (var i = 0; i < nodeLayout.length; i++) {
      expect(nodeLayout[i].width).not.toBeUndefined();
      expect(nodeLayout[i].height).not.toBeUndefined();
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
});

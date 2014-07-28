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
    expect(options.container.width).toEqual(defaultHeight);
    expect(options.stepY).toEqual(stepY);
    expect(options.stepX).toEqual(stepX);
  });
});

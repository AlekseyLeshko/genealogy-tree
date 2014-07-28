'use strict';

describe("Genealogy tree", function() {
  it("create ", function() {
    var gTree = new GenealogyTree();
    expect(gTree).not.toBeNull();
    expect(gTree.options).not.toBeUndefined();
  });

  it("get default options", function() {
    var defaultWidth = 700;
    var defaultHeight = 700;
    var options = GenealogyTree.prototype.getDefaultOptions();
    expect(options).not.toBeNull();
    expect(options.container).not.toBeUndefined();
    expect(options.container.width).toEqual(defaultWidth);
    expect(options.container.width).toEqual(defaultHeight);
  });
});

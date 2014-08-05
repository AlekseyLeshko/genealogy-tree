describe('Genealogy tree calculator', function() {
  it('create genealogy tree calculator without parameters', function() {
    var layouts = [];
    var edges = [];
    var gCalc = new GenealogyTreeCalculator(layouts, edges);

    expect(gCalc).not.toBeUndefined();
    expect(gCalc).not.toBeNull();
    expect(gCalc.layouts).not.toBeUndefined();
    expect(gCalc.edges).not.toBeUndefined();
  });

  it('get default options', function() {
    var options = GenealogyTreeCalculator.prototype.getDefaultOptions();

    expect(options).toEqual(getGCalcOptions());
  });

  it('calculation coordinates for all layouts', function() {
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);
    gtCalc.calcContainerParameters();
    expect(gTree.layouts).not.toBeUndefined();

    gtCalc.calcCoordinatesForLayouts();
    var layouts = gTree.layouts;

    _.each(layouts, function(layout) {
      _.each(layout, function(node) {
        expect(node.x).not.toBeUndefined();
        expect(node.y).not.toBeUndefined()
        });
    });
  });

  it('calculation coordinates for layout', function() {
    var gtCalc = getGenealogyTreeCalculator();
    var nodeArr = getNodes();
    gtCalc.calcContainerParameters();

    var layout = gtCalc.calcCoordinatesForLayout(nodeArr);

    expect(layout).not.toBeUndefined();
    _.each(layout, function(node) {
      expect(node.x).not.toBeUndefined();
      expect(node.y).not.toBeUndefined()
    });
  });

  it('calculation container parameters', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [getNodes()];

    gtCalc.calcContainerParameters();

    expect(gtCalc.options.container.width).toEqual(1250);
    expect(gtCalc.options.container.height).toEqual(550);
  });

  it('calculation start y', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.level = 2;

    var y = gtCalc.calcValY();

    expect(y).toEqual(350);
  });

  it('calculation layout level x', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [[1, 2, 3]]
    var countNode = 2;
    gtCalc.calcContainerParameters();

    var x = gtCalc.calcValX(countNode);

    expect(x).toEqual(290);
  });

  it('calculation width container for empty layout', function() {
    GenealogyTreeCalculator.prototype.layouts = [];
    GenealogyTreeCalculator.prototype.options = getGCalcOptions();
    var width = GenealogyTreeCalculator.prototype.calcWidthСontainer();

    expect(width).toEqual(500);
  });

  it('calculation width container for layout', function() {
    GenealogyTreeCalculator.prototype.layouts = [getNodes()];
    GenealogyTreeCalculator.prototype.options = getGCalcOptions();
    var width = GenealogyTreeCalculator.prototype.calcWidthСontainer();

    expect(width).toEqual(1250);
  });

  it('width calculation layout', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [undefined, [], getNodes()];

    var width = gtCalc.widthCalculationLayout();

    expect(width).toEqual(750);
  });

  it('width calculation layout when layouts is empty', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [];

    var width = gtCalc.widthCalculationLayout();

    expect(width).toEqual(0);
  });

  it('width calculation layout when layout is undefined', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [undefined];

    var width = gtCalc.widthCalculationLayout();

    expect(width).toEqual(0);
  });

  it('calculation height container', function() {
    var gtCalc = getGenealogyTreeCalculator();

    gtCalc.layouts = [1];
    var height = gtCalc.calcHeightСontainer();

    expect(height).toEqual(550);
  });
});

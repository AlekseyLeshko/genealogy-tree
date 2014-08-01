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

  // it('calculation coordinates for all layouts', function() {
  //   var gTree = getGenealogyTree();
  //   gTree.generationLayouts();
  //   var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);

  //   gtCalc.calcContainerParameters();

  //   expect(gTree.layouts).not.toBeUndefined();
  //   gTree.calcCoordinatesForLayouts();
  //   var layouts = gTree.layouts;

  //   _.each(layouts, function(layout) {
  //     if (layout) {
  //       _.each(layout, function(node) {
  //         expect(node.x).not.toBeUndefined();
  //         expect(node.y).not.toBeUndefined()
  //       });
  //     }
  //   });
  // });

  it('calculation coordinates for layout', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [getNodes()];

    gtCalc.calcContainerParameters();

    expect(gtCalc.options.container.width).toEqual(1700);
    expect(gtCalc.options.container.height).toEqual(600);
  });

//   it('calculation start y', function() {
//     var countNode = 2;
//     var widthNode = 30;
// gtCalc.level = 2;
//     GenealogyTree.prototype.options = getOptions();
//     var y = GenealogyTree.prototype.calcStartY(countNode);

//     var answer = 185;
//     expect(y).toEqual(answer);
//   });

  it('calculation layout level x', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [[1, 2, 3]]
    var countNode = 2;
    gtCalc.calcContainerParameters();

    var x = gtCalc.calcValX(countNode);

    expect(x).toEqual(340);
  });

//   it('calculation width container for empty layout', function() {
//     GenealogyTree.prototype.layouts = [];
//     GenealogyTree.prototype.options = getDefaultOptions();
//     var width = GenealogyTree.prototype.calcWidthСontainer();

//     expect(width).toEqual(500);
//   });

//   it('calculation width container for layout', function() {
//     GenealogyTree.prototype.layouts = [getNodes()];
//     GenealogyTree.prototype.options = getDefaultOptions();
//     var width = GenealogyTree.prototype.calcWidthСontainer();

//     expect(width).toEqual(920);
//   });

  it('width calculation layout', function() {
    var gtCalc = getGenealogyTreeCalculator();
    gtCalc.layouts = [undefined, [], getNodes()];

    var width = gtCalc.widthCalculationLayout();

    expect(width).toEqual(1200);
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

    expect(height).toEqual(600);
  });
});

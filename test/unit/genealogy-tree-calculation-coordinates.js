// describe('Calculation coordinates for genealogy tree', function() {
//   it('calculation of the container parameters', function() {
//     var gTree = getGenealogyTree();

//     gTree.generationLayouts();

//     expect(gTree.options.container).toBeUndefined();

//     gTree.calcContainerParameters();

//     expect(gTree.options.container.width).not.toBeUndefined();
//     expect(gTree.options.container.height).not.toBeUndefined();
//   });

//   it('calculation coordinates for all layouts', function() {
//     var gTree = getGenealogyTree();
//     gTree.generationLayouts();
//     gTree.calcContainerParameters();

//     expect(gTree.layouts).not.toBeUndefined();
//     gTree.calcCoordinatesForLayouts();
//     var layouts = gTree.layouts;

//     _.each(layouts, function(layout) {
//       if (layout) {
//         _.each(layout, function(node) {
//           expect(node.x).not.toBeUndefined();
//           expect(node.y).not.toBeUndefined()
//         });
//       }
//     });
//   });

//   it('calculation coordinates for layout', function() {
//     var gTree = getGenealogyTree();

//     gTree.generationLayouts();
//     gTree.calcContainerParameters();
//     var nodeArr = gTree.layouts[1];
//     var layout = gTree.calcCoordinatesForLayout(nodeArr);

//     expect(layout).not.toBeUndefined();
//     _.each(layout, function(node) {
//       expect(node.x).not.toBeUndefined();
//       expect(node.y).not.toBeUndefined()
//     });
//   });

//   it('calculation start y', function() {
//     var countNode = 2;
//     var widthNode = 30;

//     GenealogyTree.prototype.options = getOptions();
//     var y = GenealogyTree.prototype.calcStartY(countNode);

//     var answer = 185;
//     expect(y).toEqual(answer);
//   });

//   it('calculation layout level x', function() {
//     var gTree = getCreatedGenealogyTree();
//     var level = 2;

//     gTree.level = level;

//     var x = gTree.calcValX();

//     var answer = (level * gTree.options.stepX) +
//       gTree.options.frame.height;

//     expect(x).toEqual(answer);
//   });

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

//   it('width calculation layout', function() {
//     GenealogyTree.prototype.layouts = [undefined, [], getNodes()];
//     GenealogyTree.prototype.options = getDefaultOptions();
//     var width = GenealogyTree.prototype.widthCalculationLayout();

//     expect(width).toEqual(420);
//   });

//   it('width calculation layout when layouts is empty', function() {
//     GenealogyTree.prototype.layouts = [];
//     GenealogyTree.prototype.options = getDefaultOptions();
//     var width = GenealogyTree.prototype.widthCalculationLayout();

//     expect(width).toEqual(0);
//   });

//   it('width calculation layout when layout is undefined', function() {
//     GenealogyTree.prototype.layouts = [undefined];
//     GenealogyTree.prototype.options = getDefaultOptions();
//     var width = GenealogyTree.prototype.widthCalculationLayout();

//     expect(width).toEqual(0);
//   });

//   it('calculation height container', function() {
//     GenealogyTree.prototype.layouts = [1];
//     var height = GenealogyTree.prototype.calcHeightСontainer();

//     expect(height).toEqual(600);
//   });
// });

'use strict';

describe('Edge: ', function() {
  it('init edge', function() {
    var link = new Edge();
    link.options = undefined;
    link.methodOfType = undefined;

    link.init();

    expect(link.methodOfType).not.toBeUndefined();
    expect(link.options).not.toBeUndefined();
  });

  it('create options', function() {
    var link = new Edge();
    link.options = null;
    expect(link.options).toBeNull();

    link.createOptions();

    expect(link.options).not.toBeNull();
    expect(link.options.class).toEqual('link');
    expect(link.options.strokeColor).toEqual('black');
    expect(link.options.strokeWidth).toEqual(1);
  });

  it('create options with argument', function() {
    var link = new Edge();
    link.options = null;
    expect(link.options).toBeNull();
    var options = {
      strokeColor: 'red',
      strokeWidth: 2
    };

    link.createOptions(options);

    expect(link.options).not.toBeNull();
    expect(link.options.class).toEqual('link');
    expect(link.options.strokeColor).toEqual('red');
    expect(link.options.strokeWidth).toEqual(2);
  });



  it('draw and set edge container', function() {
    var link = new Edge();
    var container = d3.select('body').append('svg');

    link.drawAndSetEdgeContainer(container);

    expect(container.selectAll('g')[0].length).toEqual(1);
    expect(link.container.attr('class')).toEqual('link');
  });

  it('create edge without parameters', function() {
    var edge = new Edge();

    expect(edge).not.toBeUndefined();
    expect(edge).not.toBeNull();
  });

  it('create edge with parameters', function() {
    var nodes = getNodes();
    var typeRelationship = 'marriage';
    var edge = new Edge(nodes[0], nodes[1], typeRelationship);

    expect(edge.parent).toEqual(nodes[0]);
    expect(edge.child).toEqual(nodes[1]);
    expect(edge.typeRelationship).toEqual(typeRelationship);
  });

  // it('calculation edge coordinates for marriage type', function() {
  //   var gTree = getGenealogyTree();
  //   gTree.generationLayouts();
  //   var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);
  //   gtCalc.calcContainerParameters();
  //   expect(gTree.layouts).not.toBeUndefined();

  //   gtCalc.calcCoordinatesForLayouts();

  //   var nodes = gTree.nodes;
  //   var typeRelationship = 'marriage';

  //   var edge = new Edge(nodes[0], nodes[1], typeRelationship);
  //   edge.calcCoordinates();

  //   expect(edge.coordinates.pairs.length).toEqual(6);
  // });

  // it('calculation edge coordinates for of_marriage type', function() {
  //   var gTree = getGenealogyTree();
  //   gTree.generationLayouts();
  //   var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);
  //   gtCalc.calcContainerParameters();
  //   expect(gTree.layouts).not.toBeUndefined();

  //   gtCalc.calcCoordinatesForLayouts();
  //   var nodes = gTree.nodes;
  //   var parentType = 'marriage';
  //   var typeRelationship = 'of_marriage';

  //   var parentEdge = new Edge(nodes[0], nodes[1], parentType);
  //   parentEdge.calcCoordinates();
  //   var edge = new Edge(parentEdge, nodes[2], typeRelationship);

  //   edge.calcCoordinates();

  //   expect(edge.coordinates.pairs.length).toEqual(2);
  // });

  it('render type of_marrige', function() {
    var container = d3.select('body').append('svg');
    var link = new Edge();
    link.drawAndSetEdgeContainer(container);
    link.coordinates = {
      pairs: [{ x: 1, y: 1 }, { x: 10, y: 10 },
        { x: 10, y: 10 }, { x: 10, y: 10 },
        { x: 10, y: 10 }, { x: 10, y: 10 }
      ]
    };

    link.renderTypeMarrige();

    expect(link.container.selectAll('line')[0].length).toEqual(3);
  });

  it('render type of_marrige', function() {
    var container = d3.select('body').append('svg');
    var link = new Edge();
    link.drawAndSetEdgeContainer(container);
    link.coordinates = {
      pairs: [{ x: 1, y: 1}, { x: 10, y: 10}]
    };

    link.renderTypeOfMarrige();

    expect(link.container.selectAll('line')[0].length).toEqual(1);
  });

  it('create line', function() {
    var link = new Edge();
    var pairs = [{ x: 1, y: 1}, { x: 10, y: 10}];
    var container = d3.select('body').append('svg');
    expect(container.selectAll('line')[0].length).toEqual(0);

    link.drawAndSetEdgeContainer(container);
    link.drawLink(pairs);

    expect(container.selectAll('line')[0].length).toEqual(1);
  });
});

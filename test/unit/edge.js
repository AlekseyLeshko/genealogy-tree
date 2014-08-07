'use strict';

describe('Edge: ', function() {
  it('render edge with type marriage', function() {
    var container = d3.select('body').append('svg');
    var edge = new Edge({}, {}, 'marriage');

    var svgedge = edge.render(container);

    expect(svgedge).not.toBeUndefined();
    expect(svgedge).not.toBeNull();
    expect(svgedge.attr('class')).toEqual('link');
  });

  it('render edge with type of_marriage', function() {
    var container = d3.select('body').append('svg');
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var parent = gTree.edges.slice(0, 1)[0];
    parent.calcCoorTypeMarrige();
    var child = gTree.nodes.slice(3, 4)[0];
    var edge = new Edge(parent, child, 'of_marriage');

    var svgedge = edge.render(container);

    expect(svgedge).not.toBeUndefined();
    expect(svgedge).not.toBeNull();
    expect(svgedge.attr('class')).toEqual('link');
  });


  it('init', function() {
    var edge = new Edge();
    edge.options = undefined;
    edge.methodOfType = undefined;

    edge.init();

    expect(edge.methodOfType).not.toBeUndefined();
    expect(edge.options).not.toBeUndefined();
  });

  it('create options', function() {
    var edge = new Edge();
    edge.options = null;
    expect(edge.options).toBeNull();

    edge.createOptions();

    expect(edge.options).not.toBeNull();
    expect(edge.options.class).toEqual('link');
    expect(edge.options.strokeColor).toEqual('black');
    expect(edge.options.strokeWidth).toEqual(1);
  });

  it('create options with argument', function() {
    var edge = new Edge();
    edge.options = null;
    expect(edge.options).toBeNull();
    var options = {
      strokeColor: 'red',
      strokeWidth: 2
    };

    edge.createOptions(options);

    expect(edge.options).not.toBeNull();
    expect(edge.options.class).toEqual('link');
    expect(edge.options.strokeColor).toEqual('red');
    expect(edge.options.strokeWidth).toEqual(2);
  });

  it('draw and set edge container', function() {
    var edge = new Edge();
    var container = d3.select('body').append('svg');

    edge.drawAndSetEdgeContainer(container);

    expect(container.selectAll('g')[0].length).toEqual(1);
    expect(edge.container.attr('class')).toEqual('link');
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

  it('calculation edge coordinates for marriage type', function() {
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);
    gtCalc.calcContainerParameters();
    expect(gTree.layouts).not.toBeUndefined();

    gtCalc.calcCoordinatesForLayouts();

    var nodes = gTree.nodes;
    var typeRelationship = 'marriage';

    var edge = new Edge(nodes[0], nodes[1], typeRelationship);
    edge.calcCoordinates();

    expect(edge.coordinates.pairs.length).toEqual(6);
  });

  it('calculation edge coordinates for of_marriage type', function() {
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var gtCalc = new GenealogyTreeCalculator(gTree.layouts, gTree.edges);
    gtCalc.calcContainerParameters();
    expect(gTree.layouts).not.toBeUndefined();

    gtCalc.calcCoordinatesForLayouts();
    var nodes = gTree.nodes;
    var parentType = 'marriage';
    var typeRelationship = 'of_marriage';

    var parentEdge = new Edge(nodes[0], nodes[1], parentType);
    parentEdge.calcCoordinates();
    var edge = new Edge(parentEdge, nodes[2], typeRelationship);

    edge.calcCoordinates();

    expect(edge.coordinates.pairs.length).toEqual(2);
  });

  it('calculation coordinatesfor node with type marrige', function() {
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var parent = gTree.edges.slice(0, 1)[0];
    var child = gTree.nodes.slice(1, 2)[0];

    var edge = new Edge(parent, child);

    edge.calcCoorTypeMarrige();

    expect(edge.coordinates.pairs.length).toEqual(6);
  });

  it('calculation coordinatesfor node with type of_marrige', function() {
    var gTree = getGenealogyTree();
    gTree.generationLayouts();
    var parent = gTree.edges.slice(0, 1)[0];
    parent.calcCoorTypeMarrige();
    var child = gTree.nodes.slice(3, 4)[0];

    var edge = new Edge(parent, child);

    edge.calcCoorTypeOfMarrige();

    expect(edge.coordinates.pairs.length).toEqual(2);
  });

  it('render type of_marrige', function() {
    var container = d3.select('body').append('svg');
    var edge = new Edge();
    edge.drawAndSetEdgeContainer(container);
    edge.coordinates = {
      pairs: [{ x: 1, y: 1 }, { x: 10, y: 10 },
        { x: 10, y: 10 }, { x: 10, y: 10 },
        { x: 10, y: 10 }, { x: 10, y: 10 }
      ]
    };

    edge.renderTypeMarrige();

    expect(edge.container.selectAll('line')[0].length).toEqual(3);
  });

  it('render type of_marrige', function() {
    var container = d3.select('body').append('svg');
    var edge = new Edge();
    edge.drawAndSetEdgeContainer(container);
    edge.coordinates = {
      pairs: [{ x: 1, y: 1}, { x: 10, y: 10}]
    };

    edge.renderTypeOfMarrige();

    expect(edge.container.selectAll('line')[0].length).toEqual(1);
  });

  it('create line', function() {
    var edge = new Edge();
    var pairs = [{ x: 1, y: 1}, { x: 10, y: 10}];
    var container = d3.select('body').append('svg');
    expect(container.selectAll('line')[0].length).toEqual(0);

    edge.drawAndSetEdgeContainer(container);
    edge.drawLink(pairs);

    expect(container.selectAll('line')[0].length).toEqual(1);
  });

  it('set color', function() {
    var edge = new Edge();
    var pairs = [{ x: 1, y: 1}, { x: 10, y: 10}];
    var container = d3.select('body').append('svg');
    edge.drawAndSetEdgeContainer(container);
    edge.drawLink(pairs);
    var color = 'green';

    edge.setColor(color);

    expect(edge.container.select('line').attr('stroke')).toEqual('black');
    expect(edge.container.select('line').attr('style')).toContain("stroke:");
  });
});

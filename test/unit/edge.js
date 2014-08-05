'use strict';

describe('Edge: ', function() {
  it('create options', function() {
    var link = new Edge();
    link.options = null;
    expect(link.options).toBeNull();

    link.createOptions();

    expect(link.options).not.toBeNull();
    expect(link.options.class).toEqual('link');
    expect(link.options.borderColor).toEqual('black');
    expect(link.options.strokeWidth).toEqual(1);
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

  it('init edge', function() {
    Edge.prototype.init();

    expect(true).toBeTruthy();
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
});

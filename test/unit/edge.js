'use strict';

describe('Edge: ', function() {
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

  it('edge coordinates', function() {
    var gTree = getCreatedGenealogyTree();
    gTree.calcContainerParameters();
    gTree.calcCoordinatesForLayouts();

    var nodes = gTree.nodes;
    var typeRelationship = 'marriage';
    var edge = new Edge(nodes[0], nodes[1], typeRelationship);
    edge.calcCoordinates();

    expect(edge.x1).toEqual(nodes[0].y + 5);
    expect(edge.y1).toEqual(nodes[0].x + 12);
    expect(edge.x2).toEqual(nodes[1].y + 15);
    expect(edge.y2).toEqual(nodes[1].x + 12);
  });
});

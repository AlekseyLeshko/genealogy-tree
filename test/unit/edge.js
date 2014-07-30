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
    expect(edge.typeRelationship).toEqual(typesRelationship[typeRelationship]);
  });

  it('init edge', function() {
    Edge.prototype.init();

    expect(true).toBeTruthy();
  });
});

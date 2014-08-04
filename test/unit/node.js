'use strict';

describe('Node: ', function() {
  it('create node', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);

    expect(node).not.toBeUndefined();
    expect(node).not.toBeNull();
    expect(node.parents.length).toEqual(0);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(0);
  });

  it('get type', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);

    expect(node.getType()).toEqual('Node');
  });

  it('update data to parent node', function() {
    var node = new Node(getNodes().slice(0, 1));
    var children = getNodes().slice(2, 7);
    var edges = [new Edge(), new Edge()]

    expect(node.parents.length).toEqual(0);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(0);

    node.updateToParentNode(children, edges);

    expect(node.parents.length).toEqual(0);
    expect(node.children.length).toEqual(children.length);
    expect(node.edges.length).toEqual(edges.length);
  });

  it('update data to child node', function() {
    var node = new Node(getNodes().slice(3, 4));
    var parents = getNodes().splice(0, 1);
    var edges = [new Edge(), new Edge()]

    expect(node.parents.length).toEqual(0);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(0);

    node.updateToChildNode(parents, edges);

    expect(node.parents.length).toEqual(parents.length);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(edges.length);
  });
});

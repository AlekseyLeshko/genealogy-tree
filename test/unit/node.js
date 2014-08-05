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
    expect(node.width).not.toBeUndefined();
    expect(node.height).not.toBeUndefined();
  });

  it('get type', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);

    expect(node.getType()).toEqual('Node');
  });

  it('update data to parent node', function() {
    var node = new Node(getNodes().slice(0, 1));
    var children = getNodes().slice(2, 7);
    var edges = [new Edge(), new Edge()];

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
    var edges = [new Edge(), new Edge()];
    node.edges = [new Edge(), new Edge()];

    expect(node.parents.length).toEqual(0);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(2);

    node.updateToChildNode(parents, edges);

    expect(node.parents.length).toEqual(parents.length);
    expect(node.children.length).toEqual(0);
    expect(node.edges.length).toEqual(4);
  });

  it('get width', function() {
    expect(Node.prototype.width).toBeUndefined();

    Node.prototype.getWidth();

    var magicNum = 20;
    expect(Node.prototype.width).toEqual(magicNum);
  });

  it('start get width the second time', function() {
    var node = new Node(getNodes().slice(0, 1)[0]);

    node.width = 40;
    expect(node.width).toEqual(40);

    node.getWidth();

    var magicNum = 20;
    expect(node.width).not.toEqual(magicNum);
  });

  it('get height', function() {
    expect(Node.prototype.height).toBeUndefined();

    Node.prototype.getHeight();

    var magicNum = 20;
    expect(Node.prototype.height).toEqual(magicNum);
  });

  it('start get height the second time', function() {
    var node = new Node(getNodes().slice(0, 1)[0]);

    node.height = 40;
    expect(node.height).toEqual(40);

    node.getHeight();

    var magicNum = 20;
    expect(node.height).not.toEqual(magicNum);
  });

  it('whether to draw a symbol for node with type concubine', function() {
    var data = {
      isConcubine: true,
      isUnnamed: false
    };

    var node = new Node(data);
    var answer = node.whetherDrawSymbol();

    expect(answer).toBeTruthy();
  });

  it('whether to draw a symbol for node with type unnamed', function() {
    var data = {
      isConcubine: false,
      isUnnamed: true
    };

    var node = new Node(data);
    var answer = node.whetherDrawSymbol();

    expect(answer).toBeTruthy();
  });

  it('get symbol', function() {
    var data = {
      isConcubine: true,
      isUnnamed: false
    };

    var node = new Node(data);
    var answer = node.getSymbol();

    expect(answer.text).toEqual('c');
  })
});

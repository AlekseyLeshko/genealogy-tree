'use strict';

describe('Node: ', function() {
  it('create node', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);

    expect(node).not.toBeUndefined();
    expect(node).not.toBeNull();
    expect(node.data).not.toBeNull();
  });

  it('get type', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);

    expect(node.getType()).toEqual('Node');
  });
});

'use strict';

describe('Node render: ', function() {
  it('create node render', function() {
    var data = getNodes().splice(0, 1);
    var node = new Node(data);
    var nodeR = new NodeRender(data);

    expect(nodeR).not.toBeUndefined();
    expect(nodeR).not.toBeNull();
  });
});

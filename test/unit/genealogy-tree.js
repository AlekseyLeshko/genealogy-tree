'use strict';

describe('Genealogy tree: ', function() {
  it('create tree without parameters', function() {
    var gTree = new GenealogyTree();

    expect(gTree).not.toBeUndefined();
    expect(gTree).not.toBeNull();
  });

  it('create tree with parameters', function() {
    var gTree = getGenealogyTree();

    expect(gTree).not.toBeUndefined();
    expect(gTree).not.toBeNull();

    expect(gTree.nodes.length).toEqual(getNodes().length);
    expect(gTree.relationships.length).toEqual(getRelationships().length);
    expect(gTree.dataLayouts.length).toEqual(1);
    expect(gTree.dataLayouts[0].length).toEqual(getRootRelationships().length);
  });

  it('init tree craete structure', function() {
    GenealogyTree.prototype.init();

    expect(GenealogyTree.prototype.level).toEqual(0);
    expect(GenealogyTree.prototype.dataLayouts.length).toEqual(0);
    expect(GenealogyTree.prototype.layouts.length).toEqual(0);
    expect(GenealogyTree.prototype.edges.length).toEqual(0);
  });

  it('generation tree', function() {
    var gTree = getGenealogyTree();

    gTree.generationTree();
    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(3);
    // expect(layouts[0].length).toEqual(2);
    // expect(layouts[1].length).toEqual(2);
  });

  // it('generation layout', function() {
  //   var nodes = getNodes();
  //   var relationships = getRelationships();
  //   var rootRelationships = getRootRelationships();
  //   var length = relationships.length - 1;

  //   var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
  //   gTree.generationLayout();
  //   var layouts = gTree.layouts;

  //   expect(gTree.relationships.length).toEqual(length);

  //   expect(layouts.length).toEqual(1);
  //   expect(layouts[0].length).toEqual(2);
  //   expect(gTree.dataLayouts.length).toEqual(2);
  //   expect(gTree.dataLayouts[1].length).toEqual(2);
  // });

  // it('get default options', function() {
  //   var options = GenealogyTree.prototype.getDefaultOptions();

  //   expect(options).toEqual(getDefaultOptions());
  // });

  // it('add nodes for current layout', function() {
  //   var nodes = getNodes().slice(0, 2);
  //   var level = 1;

  //   GenealogyTree.prototype.level = level;
  //   GenealogyTree.prototype.layouts = [];

  //   GenealogyTree.prototype.addNodesForCurrentLayout(nodes);

  //   var arr = GenealogyTree.prototype.layouts;

  //   expect(arr.length).toEqual(2);
  //   expect(arr[1].length).toEqual(2);
  // });

  // it('add nodes for next layout', function() {
  //   var nodes = getNodes().slice(0, 2);
  //   var level = 1;

  //   GenealogyTree.prototype.level = level;
  //   GenealogyTree.prototype.dataLayouts = [];

  //   GenealogyTree.prototype.addNodesForLayoutData(nodes);

  //   var arr = GenealogyTree.prototype.dataLayouts;

  //   expect(arr.length).toEqual(3);
  //   expect(arr[2].length).toEqual(2);
  // });

  // it('find element by id', function() {
  //   var arr = [{
  //     id: 1
  //   }, {
  //     id: 2
  //   }];

  //   var val = 2;
  //   var key = 'id';
  //   var obj = GenealogyTree.prototype.findElementInArr(key, val, arr);

  //   expect(obj[key]).toEqual(val);
  // });

  // it('get relationships', function() {
  //   var nodes = getNodes().slice(0, 2);

  //   GenealogyTree.prototype.relationships = getRelationships();
  //   var arr = GenealogyTree.prototype.getRelationships(nodes);

  //   expect(arr.length).toEqual(1);
  // });

  // it('get nodes by id', function() {
  //   var arrIds = [1, 2 ,3];

  //   GenealogyTree.prototype.nodes = getNodes()
  //   var nodes = GenealogyTree.prototype.findNodesByIds(arrIds);

  //   expect(nodes.length).toEqual(arrIds.length);
  // });

  // it('not finded element by id', function() {
  //   var arr = [{
  //     id: 1
  //   }, {
  //     id: 2
  //   }];

  //   var val = 3;
  //   var key = 'id';
  //   var obj = GenealogyTree.prototype.findElementInArr(key, val, arr);

  //   expect(obj).toBeUndefined();
  // });

  // it('get node of relationship', function() {
  //   var key = 'wife';

  //   var node = GenealogyTree.prototype.getNodeOfRelationship(getRelationships()[0][key]);

  //   expect(node).toEqual(getNodes()[1]);
  // });

  // it('get node of relationship not finded node', function() {
  //   var val = '-1';
  //   var node = GenealogyTree.prototype.getNodeOfRelationship(val, getNodes());

  //   expect(node).toBeUndefined();
  // });

  // it('unset val in relationships', function() {
  //   var relationships = getRelationships();
  //   var length = relationships.length;
  //   var val = relationships[0];

  //   GenealogyTree.prototype.relationships = relationships;
  //   var el = GenealogyTree.prototype.unsetRelationship(val);
  //   var arr = GenealogyTree.prototype.relationships;

  //   expect(el).toEqual([val]);
  //   expect(arr.length).toEqual(length - 1);
  // });

  // it('get nodes', function() {
  //   var nodes = getNodes();
  //   var relationships = getRelationships();
  //   var rootRelationships = getRootRelationships();

  //   var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
  //   gTree.generationLayouts();
  //   var nodes = gTree.getNodes();

  //   expect(nodes.length).toEqual(4);
  // });

  // it('comparison objects', function() {
  //   var x = { a: 1, b: 2};
  //   var y = { a: 1, b: 2};

  //   var res = GenealogyTree.prototype.comparison(x, y);

  //   expect(res).toBeTruthy();
  // });

  // it('add spouses node to layout', function() {
  //   var nodes = getNodes();
  //   var relationships = getRelationships();
  //   var val = relationships[0];
  //   var rootRelationships = getRootRelationships();

  //   var gTree = new GenealogyTree(nodes, relationships, rootRelationships)
  //   gTree.addSpousesNodeToLayout(val);
  //   var layouts = gTree.layouts;

  //   expect(layouts.length).toEqual(1);
  //   expect(layouts[0].length).toEqual(2);
  // });

  it('need create next layout when data layout is empty', function() {
    var level = 1;
    GenealogyTree.prototype.dataLayouts = [];

    var answer = GenealogyTree.prototype.needToCreateNextLayout();

    expect(answer).toBeFalsy();
  });

  it('need craete next layout when data layout is not empty', function() {
    var level = 1;
    GenealogyTree.prototype.dataLayouts = [[], [], getNodes()];

    GenealogyTree.prototype.level = level;
    var answer = GenealogyTree.prototype.needToCreateNextLayout();

    expect(answer).toBeTruthy();
  });

  // it('next layout is exists when next layout is undefined', function() {
  //   GenealogyTree.prototype.level = 0;
  //   GenealogyTree.prototype.dataLayouts = [];
  //   var answer = GenealogyTree.prototype.nextLayoutIsExists();

  //   expect(answer).toBeFalsy();
  // });

  // it('next layout is exists when next layout is empty', function() {
  //   GenealogyTree.prototype.level = 0;
  //   GenealogyTree.prototype.dataLayouts = [[], []];
  //   var answer = GenealogyTree.prototype.nextLayoutIsExists();

  //   expect(answer).toBeFalsy();
  // });

  // it('next layout is exists when next layout is not empty', function() {
  //   GenealogyTree.prototype.level = 0;
  //   GenealogyTree.prototype.dataLayouts = [[], [1, 2]];
  //   var answer = GenealogyTree.prototype.nextLayoutIsExists();

  //   expect(answer).toBeTruthy();
  // });

  // it('create edges of relationship', function() {
  //   var relationship = getRelationships().slice(0, 1)[0];
  //   var type = 'marriage'
  //   var childrenType = 'of_marriage';
  //   GenealogyTree.prototype.nodes = getNodes();
  //   GenealogyTree.prototype.edges = [];
  //   GenealogyTree.prototype.createEdges(relationship);
  //   var edges = GenealogyTree.prototype.edges;

  //   expect(edges.length).toEqual(3);
  //   expect(edges[0].typeRelationship).toEqual(type);
  //   expect(edges[1].typeRelationship).toEqual(childrenType);
  //   expect(edges[2].typeRelationship).toEqual(childrenType);
  // });
});

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

    expect(layouts.length).toEqual(4);
    expect(layouts[0].length).toEqual(2);
    expect(layouts[1].length).toEqual(5);
    expect(layouts[2].length).toEqual(2);
    expect(layouts[3].length).toEqual(1);
  });

  it('generation layouts', function() {
    var gTree = getGenealogyTree();

    gTree.generationLayouts();
    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(4);
    expect(layouts[0].length).toEqual(2);
    expect(layouts[1].length).toEqual(5);
    expect(layouts[2].length).toEqual(2);
    expect(layouts[3].length).toEqual(1);
  });

  it('generation layout with relationships', function() {
    var length = getRelationships().length - 1;

    var gTree = getGenealogyTree();
    gTree.preparationLayout();
    gTree.generationLayout(gTree.dataLayouts[0]);
    var layouts = gTree.layouts;

    expect(gTree.relationships.length).toEqual(length);
    expect(layouts.length).toEqual(1);
    expect(layouts[0].length).toEqual(2);
    expect(gTree.dataLayouts.length).toEqual(2);
    expect(gTree.dataLayouts[1].length).toEqual(5);
  });

  it('generation layout with relationships and nodes', function() {
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = [3, 4, 5, 6, 7];
    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);
    gTree.preparationLayout();

    gTree.generationLayout(gTree.dataLayouts[0]);
    var layouts = gTree.layouts;

    expect(gTree.relationships.length).toEqual(2);
    expect(layouts.length).toEqual(1);
    expect(layouts[0].length).toEqual(5);
    expect(gTree.dataLayouts.length).toEqual(2);
    expect(gTree.dataLayouts[1].length).toEqual(2);
  });

  it('preparationLayout', function() {

  });

  it('add nodes for layout', function() {
    var nodes = getNodes().slice(0, 2);
    var level = 0;
    var layouts = [];

    GenealogyTree.prototype.addNodesForLayout(nodes, layouts, level);

    expect(layouts.length).toEqual(level + 1);
    expect(layouts[0].length).toEqual(nodes.length);
  });

  it('get relationships', function() {
    var ids = [3, 4, 5, 6, 7];

    GenealogyTree.prototype.nodes = getNodes();
    GenealogyTree.prototype.relationships = getRelationships();
    var obj = GenealogyTree.prototype.getRelationshipsAndNodes(ids);

    expect(obj.relationships.length).toEqual(2);
    expect(obj.nodes.length).toEqual(1);
  });

  it('time: get relationships', function() {
    var ids = [3, 4, 5, 6, 7];

    var gTree = getGenealogyTree();
    var data = timer(gTree, 'getRelationshipsAndNodes');
    data.f(ids);

    expect(data.time < 300).toBeTruthy();
  });

  it('get nodes by id', function() {
    var arrIds = getRelationships()[0].spouses;
    var gTree = getGenealogyTree();

    var nodes = gTree.findNodesByIds(arrIds);

    expect(nodes.length).toEqual(arrIds.length);
    expect(nodes[0].length).toBeUndefined();
  });

  it('unset val in relationships', function() {
    var relationships = getRelationships();
    var length = relationships.length;
    var val = relationships[0];

    GenealogyTree.prototype.relationships = relationships;
    var el = GenealogyTree.prototype.unsetRelationship(val);
    var arr = GenealogyTree.prototype.relationships;

    expect(el).toEqual([val]);
    expect(arr.length).toEqual(length - 1);
  });

  it('get nodes', function() {
    var gTree = getCreatedGenealogyTree();

    var nodes = gTree.getNodes();

    expect(nodes.length).toEqual(getNodes().length);
  });

  it('comparison objects', function() {
    var x = { a: 1, b: 2};
    var y = { a: 1, b: 2};

    var res = GenealogyTree.prototype.comparison(x, y);

    expect(res).toBeTruthy();
  });

  it('add spouses node to layout', function() {
    var val = getRelationships()[0];
    var gTree = getGenealogyTree();

    gTree.addSpousesNodeToLayout(val);
    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(1);
    expect(layouts[0].length).toEqual(2);
  });

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

  it('next layout is exists when next layout is undefined', function() {
    GenealogyTree.prototype.level = 0;
    GenealogyTree.prototype.dataLayouts = [];
    var answer = GenealogyTree.prototype.nextLayoutIsExists();

    expect(answer).toBeFalsy();
  });

  it('next layout is exists when next layout is empty', function() {
    GenealogyTree.prototype.level = 0;
    GenealogyTree.prototype.dataLayouts = [[], []];
    var answer = GenealogyTree.prototype.nextLayoutIsExists();

    expect(answer).toBeFalsy();
  });

  it('next layout is exists when next layout is not empty', function() {
    GenealogyTree.prototype.level = 0;
    GenealogyTree.prototype.dataLayouts = [[], [1, 2]];
    var answer = GenealogyTree.prototype.nextLayoutIsExists();

    expect(answer).toBeTruthy();
  });

  it('create edges of relationship', function() {
    var relationship = getRelationships().slice(0, 1)[0];
    var type = 'marriage'
    var childrenType = 'of_marriage';
    GenealogyTree.prototype.nodes = getNodes();
    GenealogyTree.prototype.edges = [];

    GenealogyTree.prototype.createEdges(relationship);
    var edges = GenealogyTree.prototype.edges;

    expect(edges.length).toEqual(6);
    expect(edges[0].typeRelationship).toEqual(type);
    expect(edges[1].typeRelationship).toEqual(childrenType);
    expect(edges[2].typeRelationship).toEqual(childrenType);
  });
});

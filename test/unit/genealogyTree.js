'use strict';

describe('Genealogy tree: ', function() {
  it('generation', function() {
    var gTree = getGenealogyTree();
    gTree.generation();

    var layouts = gTree.layouts;

    expect(layouts.length).toEqual(4);
    expect(layouts[0].length).toEqual(2);
    expect(layouts[1].length).toEqual(5);
    expect(layouts[2].length).toEqual(2);
    expect(layouts[3].length).toEqual(1);
    _.each(layouts, function(layout) {
      _.each(layout, function(node) {
        expect(node.x).not.toBeUndefined();
        expect(node.y).not.toBeUndefined()
        });
    });
  });

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
    var nodes = getNodes();
    var relationships = getRelationships();
    var rootRelationships = [3, 4, 5, 6, 7];
    var gTree = new GenealogyTree(nodes, relationships, rootRelationships);

    gTree.preparationLayout();

    expect(gTree.dataLayouts.length).toEqual(1);
    expect(gTree.dataLayouts[0].relationships.length).toEqual(2);
    expect(gTree.dataLayouts[0].nodes.length).toEqual(1);
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

  it('preparation relationship', function () {
    var gTree = getGenealogyTree();
    var relationship = getRelationships().slice(0, 1)[0];

    gTree.preparationRelationship(relationship);

    expect(gTree.relationships.length).toEqual(getRelationships().length - 1);
    expect(gTree.edges.length).toEqual(6);
    expect(gTree.dataLayouts[gTree.level + 1].length).toEqual(relationship.children.length);
    expect(gTree.layouts[gTree.level].length).toEqual(2);
  });

  it('create edges of relationship', function() {
    var relationship = getRelationships().slice(0, 1)[0];
    var type = 'marriage'
    var childrenType = 'of_marriage';
    GenealogyTree.prototype.nodes = GenealogyTree.prototype.createNodes(getNodes());
    GenealogyTree.prototype.edges = [];

    GenealogyTree.prototype.createEdges(relationship);
    var edges = GenealogyTree.prototype.edges;

    expect(edges.length).toEqual(6);
    expect(edges[0].typeRelationship).toEqual(type);
    expect(edges[1].typeRelationship).toEqual(childrenType);
    expect(edges[2].typeRelationship).toEqual(childrenType);
  });

  it('create nodes', function() {
    var nodes = GenealogyTree.prototype.createNodes(getNodes());

    expect(nodes.length).toEqual(getNodes().length);
    expect(_.first(nodes).getType()).toEqual('Node');
  });

  it('get container parameters', function() {
    var gTree = getGenealogyTree();
    gTree.generation();

    var parameters = gTree.getContainerParameters();

    expect(parameters.width).toEqual(850);
    expect(parameters.height).toEqual(700);
  });

  it('render', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.render(render.main);

    expect(gTree.svgContainer).not.toBeUndefined();
    expect(gTree.svgContainer.selectAll('.node')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.img')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.label')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.symbol')[0].length).toEqual(3);
    expect(gTree.svgContainer.selectAll('.link')[0].length).toEqual(12);
    expect(gTree.svgEdges.length).toEqual(12);
  });

  it('render nodes', function() {
    var gTree = getGenealogyTree();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;
    gTree.renderNodes();

    expect(gTree.svgContainer.selectAll('.node')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.img')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.label')[0].length).toEqual(10);
    expect(gTree.svgContainer.selectAll('.symbol')[0].length).toEqual(3);
  });

  it('render node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;

    gTree.renderNodeContainers();

    expect(gTree.svgContainer.selectAll('.node')[0].length).toEqual(10);
  });

  it('render img in node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;
    gTree.renderNodeContainers();
    gTree.renderNodeImgs();

    expect(gTree.svgContainer.selectAll('image')[0].length).toEqual(10);
  });

  it('render label in node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;
    gTree.renderNodeContainers();
    gTree.renderNodelabels();

    expect(gTree.svgContainer.selectAll('text')[0].length).toEqual(10);
  });

  it('render symbol in node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;
    gTree.renderNodeContainers();
    gTree.renderSymbols();

    expect(gTree.svgContainer.selectAll('text')[0].length).toEqual(3);
  });

  it('render node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    gTree.svgContainer = render.main;

    gTree.renderEdges();

    expect(gTree.svgEdges.length).toEqual(12);
  });

  it('genealogy path', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    var gTree = getGenealogyTree();
    gTree.generation();
    gTree.render(render.main);
    var node = gTree.nodes.slice(9, 10)[0];
    var adam = gTree.nodes[0];

    gTree.buildGenealogyPath(node, adam);

    var edges = gTree.svgEdges
      .filter(function(edge) {
        var res = edge.selectAll('line').attr('style') === "stroke: rgb(255, 0, 0);";
        return res;
      });

    expect(edges.length).toEqual(6);
  });

  it('genealogy path for root node', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    var gTree = getGenealogyTree();
    gTree.generation();
    gTree.render(render.main);
    var node = gTree.nodes.slice(1, 2)[0];
    var adam = gTree.nodes[0];

    gTree.buildGenealogyPath(node, adam);

    var edges = gTree.svgEdges
      .filter(function(edge) {
        var res = edge.selectAll('line').attr('style') === "stroke: rgb(255, 0, 0);";
        return res;
      });

    expect(edges.length).toEqual(0);
  });

  it('deactivate path', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    var gTree = getGenealogyTree();
    gTree.generation();
    gTree.render(render.main);
    var edge = gTree.edges.slice(0, 1)[0];
    edge.setColor('red');

    gTree.deactivatePath();

    expect(edge.container.selectAll('line').attr('style')).toBeNull();
  });

  it('is end build genealogy path return false', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var node = gTree.nodes.slice(9, 10)[0];
    var adam = gTree.nodes[0];

    var res = gTree.isEndBuildGenealogyPath(node, adam);

    expect(res).toBeFalsy();
  });

  it('is end build genealogy path with root node', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var node = gTree.nodes.slice(0, 1)[0];
    var adam = gTree.nodes[0];

    var res = gTree.isEndBuildGenealogyPath(node, adam);

    expect(res).toBeTruthy();
  });

  it('is end build genealogy path with second root node', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var node = gTree.nodes.slice(1, 2)[0];
    var adam = gTree.nodes[0];

    var res = gTree.isEndBuildGenealogyPath(node, adam);

    expect(res).toBeTruthy();
  });
});

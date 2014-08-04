'use strict';

describe('Render: ', function() {
  it('create node render', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    expect(render).not.toBeUndefined();
    expect(render).not.toBeNull();
  });

  it('get default options', function() {
    var options = Render.prototype.getDefaultOptions();

    expect(options).not.toBeUndefined();
    expect(options).not.toBeNull();
  });

  it('create container', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    render.createContainer();

    expect(render.svg).not.toBeNull();
    expect(render.wrapper).not.toBeNull();
    expect(render.main).not.toBeNull();
  });

  it('clean transform', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    render.main.attr('transform', 'translate(0,0)scale(1)');

    expect(render.main.attr('transform')).not.toBeNull();

    render.cleanTransform(render.main);

    expect(render.main.attr('transform')).toBeNull();
  });

  it('focus', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    var transformVal = 'translate(0,0)scale(1)';
    render.main.attr('transform', transformVal);
    render.wrapper.attr('transform', transformVal);

    expect(render.main.attr('transform')).not.toBeNull();
    expect(render.wrapper.attr('transform')).not.toBeNull();

    var x = 10;
    var y = 10;

    render.focus(x, y);

    expect(render.main.attr('transform')).toBeNull();
    expect(render.wrapper.attr('transform')).toEqual('translate(10, 10)scale(2)');
  });

  it('calculation new coordinate', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    var coordinate = 100;
    var nodeSide = 80;
    var containerSide = 1000;
    var newCoordinate = render.calcNewCoordinate(coordinate, nodeSide, containerSide);

    expect(newCoordinate).toEqual(220);
  });

  it('focus to node', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    var node = {
      x: 100,
      y: 100,
      width: 80,
      height: 80
    };
    render.focusToNode(node);

    expect(render.wrapper.attr('transform')).toEqual('translate(220, 220)scale(2)');
  });

  // it('tree', function() {
  //   var gTree = getGenealogyTree();
  //   var render = new Render();

  //   render.tree(gTree);

  //   expect(render.gTree).not.toBeUndefined();
  // });

  it('config container', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    Render.prototype.gTree = {
      getContainerParameters: function() {
        return { width: 500, height: 500 };
      }
    };
    render.configContainer();

    expect(render.main.select('rect').attr('class')).toEqual('overlay');
    expect(render.main.select('rect').attr('width')).toEqual('500');
    expect(render.main.select('rect').attr('height')).toEqual('500');
  });

  it('zoom-zoom mazda', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    d3.event = {
      translate: [10, 10],
      scale: 1
    };

    var zoom = render.zoom();
    zoom();

    expect(render.main.attr('transform')).not.toBeNull();
    expect(render.main.attr('transform')).toEqual('translate(10,10)scale(1)');
  });

  it('render node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    render.gTree = gTree;
    render.configContainer();
    render.renderNodeContainers();

    expect(render.main.selectAll('.node')[0].length).toEqual(10);
  });

  it('render node containers', function() {
    var gTree = getGenealogyTree();
    gTree.generation();
    var options = {container: {id: 'body'}};
    var render = new Render(options);
    render.gTree = gTree;
    render.configContainer();
    render.renderNodeContainers();
    render.renderNodeImgs();

    expect(render.main.selectAll('image')[0].length).toEqual(10);
  });
});

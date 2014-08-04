'use strict';

describe('Render: ', function() {
  it('create node render', function() {
    var options = {container: {id: 'body'}};
    var render = new Render(options);

    expect(render).not.toBeUndefined();
    expect(render).not.toBeNull();
  });

  it('create node render', function() {
    var options = Render.prototype.getDefaultOptions();

    expect(options).not.toBeUndefined();
    expect(options).not.toBeNull();
  });

  it('create node render', function() {
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
});

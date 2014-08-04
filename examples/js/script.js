function loadData() {
  var peopleJson = $.getJSON('people.json', function(data) {
      nodes = data.people;
    }
  );
  peopleJson.complete(function() {
    var json = $.getJSON('relationships.json', function(data) {
        relationships = data.relationships;
      }
    );
    json.complete(function() {
      drawTree();
    });
  });
};

var render;
function drawTree() {
  var container = '#tree';

  var rootIds = [1];
  var gTree = new GenealogyTree(nodes, relationships, rootIds);

  render = new Render(container);
  render.tree(gTree);
};

loadData();

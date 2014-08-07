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
  var options = {
    container: {
      id: '#tree',
      width: 1000,
      height: 800
    },
    focus: {
      scale: 3
    }
  };

  var rootIds = [1];
  var gTree = new GenealogyTree(nodes, relationships, rootIds);

  render = new Render(options);
  render.tree(gTree);
  var node = gTree.nodes[9];
  render.focusToNode(node);

  gTree.buildGenealogyPathFromAdam(node);
};

loadData();

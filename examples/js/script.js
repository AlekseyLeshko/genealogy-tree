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
      id: '#tree'
    },
    focus: {
      scale: 2
    }
  };

  var rootIds = [1];
  var gTree = new GenealogyTree(nodes, relationships, rootIds);

  render = new Render(options);
  render.tree(gTree);
};

loadData();

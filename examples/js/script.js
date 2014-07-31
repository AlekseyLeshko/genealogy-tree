var nodes;
var relationships;

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
    createD3(width, height);
    data();
  });
});

var gTree;
var svg;
var wrapper;
var main;
var width;
var height;

function createD3(width, height) {
  width = 500;
  height = 500;

  svg = d3.select("#tree").append("svg")
    .attr("width", width)
    .attr("height", height);
  wrapper = svg.append("g")
    .call(d3.behavior.zoom().scaleExtent([0.7, 3]).on("zoom", zoom))
  main = wrapper.append("g")
    .attr('id', 'main')
};

var defaultFocus = {
  x: 0,
  y: 0,
  scale: 1
};

function zoom() {
  main.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
};

function data() {
  var rootRelationships = relationships.slice(0, 1);

  gTree = new GenealogyTree(nodes, relationships, rootRelationships);
  gTree.generationLayouts();
  gTree.calcContainerParameters();
  gTree.calcCoordinatesForLayouts();

  width = gTree.options.container.width;
  height = gTree.options.container.height;
  main.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

  var arr = gTree.getNodes();
  var edges = gTree.edges;

  createTree(arr, edges);
  paintPolyline();
};

function paintPolyline() {
var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
var data = [1, 2, 20, 20, 40, 40, 60, 40, 80, 5, 100, 60];

var lineFunction = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .interpolate("linear");

var lineGraph = main.append('g')
  .on("mouseover", function() {
    d3.select(this).selectAll("polyline").style("stroke", "red");
    main.selectAll("line").style("stroke", "red");
  })
  .on("mouseout", function() {
    d3.select(this).selectAll("polyline").style("stroke", "blue");
    main.selectAll("line").style("stroke", "black");
  })
  .append("polyline")
  .attr("points", data)
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
};

function createNode(nodes) {
  var svgNodes = main.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  return svgNodes;
};

function createTree(nodes, edges) {
  var svgNodes = createNode(nodes);
  createCircle(svgNodes);

  createNodelabel(svgNodes);
  addSymbol(svgNodes, symbols.unnamed);
  createEdges(edges);
};

function createEdges(edges) {
  // var line = main.selectAll("line")
  //   .data(edges)
    // .attr("x1", function(d) { d.x1 })
    // .attr("y1", function(d) { d.y1 })
    // .attr("x2", function(d) { d.x2 })
    // .attr("y2", function(d) { d.y2 })
  //   .attr("stroke-width", 2)
  //   .attr("stroke", "black");
  var lines = [];
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    edge.calcCoordinates();
    var line = main.append("line")
      // .data(edges[i])
      .attr("x1", edge.x1)
      .attr("y1", edge.y1)
      .attr("x2", edge.x2)
      .attr("y2", edge.y2)
      .attr("stroke-width", 1)
      .attr("stroke", "black");
    lines.push(line);
  }
  console.log(lines);
};

function calc(val, halfSide, scale) {
  var sum = ((val * scale) + halfSide);
  console.log('sum = ' + sum);

  var res = (width / 2) - sum;
  console.log('res = ' + res);
  return res;
}

function focus(node) {
  var halfNodeWidth = 44;
  var halfNodeHeight = 32;
  var scale = 2;
  var x = calc(node.x, halfNodeWidth, scale);
  var y = calc(node.y, halfNodeHeight, scale);

  cleanTransform(main);
  cleanTransform(wrapper);

  var str = 'translate(' + y + ', ' +  x +')scale(' + scale + ')';

  wrapper.attr('transform', str);
};

function cleanTransform(el) {
  el.attr('transform', null);
};

var symbols = {
  concubine: {
    text: 'c',
    x: 7,
    y: 15
  }, unnamed: {
    text: '?',
    x: 7,
    y: 16
  },
};

function addSymbol(nodes, symbol) {
  nodes.append("text")
    .filter(function(d) { return isNodeWithSymbol(d) })
    .attr("dx", function(d) { return getSymbol(d).x; })
    .attr("y", function(d) { return getSymbol(d).y; })
    .text(function(d) { return getSymbol(d).text; })
};

function isNodeWithSymbol(d) {
  return d.isConcubine || d.isUnnamed;
};

function getSymbol(d) {
  if (d.isConcubine) {
    return symbols.concubine;
  }

  if (d.isUnnamed) {
    return symbols.unnamed;
  }
};

function createCircle(nodes) {
  nodes.append("svg:image")
    .attr("xlink:href", "img/male.png")
    // .attr("x", "0")
    // .attr("y", "-30")
    .attr("width", "20")
    .attr("height", "20");
};

function createNodelabel(nodes) {
  nodes.append("text")
    .attr("y", 30)
    .text(function(d) { return d.name; })
};

d3.select(self.frameElement).style("height", height + "px");

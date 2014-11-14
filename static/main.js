// custom javascript
$(function() {
    console.log('jquery is working!');
    createGraph();
});

function createGraph() {
    var width = 960;
    var height = 900;
    var format = d3.format(",d");
    var color = d3.scale.category20();
    var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-30,30]);
    var bubble = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(1)
        .radius(function(d) { return 35 + (sizeOfRadius(d) * 30); });

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    //get the data
    d3.json("/data", function(error, quotes) {
        var node = svg.selectAll(".node")
                .data(bubble.nodes(quotes)
                .filter(function(d) { return !d.children; }))
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});

        node.append("circle")
            .attr("r", function(d) {return d.r; })
            .style("fill", function(d) {return color(d.symbol); });

        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.symbol; });
    });

    
}
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
        .radius(function(d) { return 35 + (sizeOfRadius(d) * 60); });

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "white")
        .style("padding", "8px")
        .style("background-color", "rgba(0,0,0,0.75)")
        .style("border-radius", "6px")
        .style("font", "12px sans-serif")
        .html("tooltip");

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
            .style("fill", function(d) {return color(d.symbol); })

            .on("mouseover", function(d) {
                tooltip.html(d.name + ": $" + Number(d.price).toFixed(2) + "<br />" + "Pct. Change: " + d.pctchange + "%");
                tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left", (d3.event.pageX+10)+"px");
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });

        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.symbol; });
    });

    
}
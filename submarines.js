var svgWidth = 1325;
var svgHeigth = 2000;


var svg = d3.select("body").append("svg").attr('width', svgWidth).attr('height', svgHeigth);

var dataset;
var linearScale = d3.scaleLinear()
  .domain([0, 1450])
  .range([0, 1250]);
  
  
// cerca dataset
d3.json('/dataset').then(function(data) {
    dataset = data;
    loadDataset();
});

function switchYBody(d)
{
    const newY = dataset[d].body;
	dataset[d].y = newY;
}

function switchYTurret(d)
{
    const newY = dataset[d].turret;
	dataset[d].y = newY;
}

function switchYX(d)
{
    const newY = dataset[d].x;
	dataset[d].y = newY;
}

function switchYPorthole(d)
{
    const newY = dataset[d].porthole;
	dataset[d].y = newY;
}



// caricamento dataset
function loadDataset()
{
    svg.selectAll("g").data(dataset).join(
        function (enter) {
            g = enter.append("g"); 

            // helix
            g.append("polyline")
                .attr("points", function(d) {
                    var angleMeasure = 1/8;

                    var x = linearScale(d.x);
                    var y = linearScale(d.y);

                    var startX = x + linearScale(d.body) * Math.cos(Math.PI * (angleMeasure));
                    var startY = y + linearScale(d.body) * Math.sin(Math.PI * angleMeasure);
                    var endX = x + linearScale(d.body) * Math.cos(Math.PI * -angleMeasure);
                    var endY = y + linearScale(d.body) * Math.sin(Math.PI * -angleMeasure);

                    return [
                        startX, startY,
                        startX + linearScale(d.body)/4, startY + linearScale(d.body)/2,
                        startX + linearScale(d.body)/2, startY + linearScale(d.body)/2,
                        startX + linearScale(d.body)/2, endY - linearScale(d.body)/2,
                        startX + linearScale(d.body)/4, endY - linearScale(d.body)/2,
                        endX, endY
                    ]
                })
                .attr("class", "helix")
                .attr("fill", "yellow")
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            // body
            g.append("ellipse")
                .attr('cx', function(d) { return linearScale(d.x)})
                .attr('cy', function(d) { return linearScale(d.y) })
                .attr('rx', function(d) { return linearScale(d.body)})
                .attr('ry', function(d) { return linearScale(d.body)})
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("class", "body")
                .attr('fill', "yellow");

            // left porthole
            g.append("circle")
                .attr('cx', function(d) { return linearScale(d.x) - linearScale(d.body)/2})
                .attr("cy", function(d) { return linearScale(d.y)})
                .attr("r", function(d) { return linearScale(d.porthole)})
                .attr("class", "left-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // central porthole
            g.append("circle")
                .attr('cx', function(d) { return linearScale(d.x)})
                .attr("cy", function(d) { return linearScale(d.y)})
                .attr("r", function(d) { return linearScale(d.porthole)})
                .attr("class", "central-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // right porthole
            g.append("circle")
                .attr('cx', function(d) { return linearScale(d.x)  + linearScale(d.body)/2 })
                .attr("cy", function(d) { return linearScale(d.y) })
                .attr("r", function(d) { return linearScale(d.porthole) })
                .attr("class", "right-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // turret
            g.append("polyline")
                .attr("points", function(d) {
                    var x = linearScale(d.x);
                    var y = linearScale(d.y) - linearScale(d.body);

                    return [
                        x, y,
                        x, y - linearScale(d.turret),
                        x - linearScale(d.turret) / 3, y - linearScale(d.turret)
                    ];

                })
                .attr("class", "turret")
                .attr("fill", "None")
                .attr("stroke-width", 3)
                .attr("stroke", "black");
        },
        /***
         * UPDATE
         */
        function (update) {
            tx = d3.transition().duration(2000);

            // helix
            update.select(".helix")
                .transition(tx)
                .attr("points", function(d) {
                    var angleMeasure = 1/8;

                    var x = linearScale(d.x);
                    var y = linearScale(d.y);

                    var startX = x + linearScale(d.body) * Math.cos(Math.PI * (angleMeasure));
                    var startY = y + linearScale(d.body) * Math.sin(Math.PI * angleMeasure);
                    var endX = x + linearScale(d.body) * Math.cos(Math.PI * -angleMeasure);
                    var endY = y + linearScale(d.body) * Math.sin(Math.PI * -angleMeasure);

                    return [
                        startX, startY,
                        startX + linearScale(d.body)/4, startY + linearScale(d.body)/2,
                        startX + linearScale(d.body)/2, startY + linearScale(d.body)/2,
                        startX + linearScale(d.body)/2, endY - linearScale(d.body)/2,
                        startX + linearScale(d.body)/4, endY - linearScale(d.body)/2,
                        endX, endY
                    ]
                })
                .attr("class", "helix")
                .attr("fill", "yellow")
                .attr("stroke-width", 2)
                .attr("stroke", "black");

            // body
            update.select(".body")
                .transition(tx)
                .attr('cx', function(d) { return linearScale(d.x)})
                .attr('cy', function(d) { return linearScale(d.y) })
                .attr('rx', function(d) { return linearScale(d.body)})
                .attr('ry', function(d) { return linearScale(d.body)})
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("class", "body")
                .attr('fill', "yellow");

            // left porthole
            update.select(".left-porthole")
                .transition(tx)
                .attr('cx', function(d) { return linearScale(d.x) - linearScale(d.body)/2})
                .attr("cy", function(d) { return linearScale(d.y)})
                .attr("r", function(d) { return linearScale(d.porthole)})
                .attr("class", "left-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // central porthole
            update.select(".central-porthole")
                .transition(tx)
                .attr('cx', function(d) { return linearScale(d.x) })
                .attr("cy", function(d) { return linearScale(d.y)})
                .attr("r", function(d) { return linearScale(d.porthole)})
                .attr("class", "central-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // right porthole
            update.select(".right-porthole")
                .transition(tx)
                .attr('cx', function(d) { return linearScale(d.x) + linearScale(d.body)/2})
                .attr("cy", function(d) { return linearScale(d.y)})
                .attr("r", function(d) { return linearScale(d.porthole)})
                .attr("class", "right-porthole")
                .attr("fill", "lightblue")
				.attr("stroke", "black");

            // turret
            update.select(".turret")
                .transition(tx)
                .attr("points", function(d) {
                    var x = linearScale(d.x);
                    var y = linearScale(d.y) - linearScale(d.body);

                    return [
                        x, y,
                        x, y - linearScale(d.turret),
                        x - linearScale(d.turret) / 3, y - linearScale(d.turret)
                    ];

                })
                .attr("class", "turret")
                .attr("fill", "None")
                .attr("stroke-width", 3)
                .attr("stroke", "black");
        }
    );


    svg.selectAll(".body").on('mousedown', function(d) {
		clicked = dataset.indexOf(d);
		switchYBody(clicked);
       
        loadDataset(dataset);
    });
	
	svg.selectAll(".turret").on('mousedown', function(d) {
		clicked = dataset.indexOf(d);
		switchYTurret(clicked);
       
        loadDataset(dataset);
    });
	
	svg.selectAll(".helix").on('mousedown', function(d) {
		thisdIndex = dataset.indexOf(d);
		switchYX(thisdIndex);
       
        loadDataset(dataset);
    });
	
	svg.selectAll(".central-porthole").on('mousedown', function(d) {
		clicked = dataset.indexOf(d);
		switchYPorthole(clicked);
       
        loadDataset(dataset);
    });
	
	svg.selectAll(".left-porthole").on('mousedown', function(d) {
		clicked = dataset.indexOf(d);
		switchYPorthole(clicked);
       
        loadDataset(dataset);
    });
	
	svg.selectAll(".right-porthole").on('mousedown', function(d) {
		clicked = dataset.indexOf(d);
		switchYPorthole(clicked);
       
        loadDataset(dataset);
    });
}
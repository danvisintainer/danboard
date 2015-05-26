$(function() {
  data = jQuery.get('yearlyGDP.txt', function(data) {
    var myvar = data;
  });
  
  var uptime = Math.floor(new Date().getTime() / 1000) - gon.boot_time;
  $('#uptime').append('Server Uptime: ' + secondsToString(uptime));
  setInterval(updateUptime, 1000);

  drawGDPChart();

});

function updateUptime(){
  $('#uptime').empty();
  $('#uptime').append('Server Uptime: ' + secondsToString(Math.floor(new Date().getTime() / 1000) - gon.boot_time));
}

function secondsToString(seconds) {
  var numdays = Math.floor((seconds % 31536000) / 86400); 
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numdays + " days, " + numhours + ":" + numminutes + ":" + numseconds;
}

function drawGDPChart() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("yearlyGDP.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.GDP; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.GDP); })
      .attr("height", function(d) { return height - y(d.GDP); });

});

function type(d) {
  d.GDP = +d.GDP;
  return d;
}
}
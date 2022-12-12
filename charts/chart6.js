//Wrap your chart in a function with chosen name
export default function densityChart() {
    var width = 500;
  var height = 500;
  var margin = {top: 20, right: 20, bottom: 20, left: 30};

var svg = d3.select("#densityChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom) 
  .append("g");

    

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        

        d3.csv("./charts/data/customer_satisfaction.csv").then(function(data) {
                
        
         // add the x Axis
  var x = d3.scaleLinear()
  .domain([0, 200])
  .range([40, width]);
svg.append("g")
.attr('class', 'axis')
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
var y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, 0.03]);
svg.append("g")
.attr('class', 'axis')
.attr("transform", "translate(40," + "1" + ")")
.call(d3.axisLeft(y));

// Compute kernel density estimation
var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
var density =  kde( data.map(function(d){  return d.Age; }) )

// Plot the area
svg.append("path")
.attr("class", "mypath")
.datum(density)
.attr("fill", "var(--secondary)")
.attr("opacity", ".8")
.attr("stroke", "#000")
.attr("stroke-width", 1)
.attr("stroke-linejoin", "round")
.attr("d",  d3.line()
.curve(d3.curveBasis)
.x(function(d) { return x(d[0]); })
.y(function(d) { return y(d[1]); })
);

});


// Function to compute density
function kernelDensityEstimator(kernel, X) {
return function(V) {
return X.map(function(x) {
return [x, d3.mean(V, function(v) { return kernel(x - v); })];
});
};
}
function kernelEpanechnikov(k) {
return function(v) {
return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
};
}}
export default function gaugeChart() {
    
    //title
    let title = d3.select("#gaugeChart").append("div").attr("id", "title");
    title._groups[0][0].innerHTML = `
    <h3>Total Number of Flight Distance</h2>
    `;
    
    // set the dimensions and margins of the graph
    var width = 400;
    var height = 100;
    var margin = 20;

    // The maximum value of the gauge
    var maxValue = 150000;

    // The initial value of the gauge
    var initialValue = 0;

    // The desired final value of the gauge
    var finalValue = 108132;

    d3.csv("./data/customer_satisfaction.csv").then( function(data) {
        
                  
    });


    // append the svg object to the body of the page
    var svg = d3.select("#gauge-chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");
       

    // Create a linear scale
    var x = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, width - 2 * margin]);

    // Draw the gauge
    var gauge = svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", x(maxValue))
      .attr("height", height - 2 * margin)
      .style("fill", "#573280")

    // Add a value indicator
    var valueIndicator = svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", x(initialValue))
      .attr("height", height - 2 * margin)
      .style("fill", "#FFA306")

    // Add a scale
    var xAxis = d3.axisBottom()
      .scale(x)

    svg.append("g")
      .attr("transform", "translate(0," + (height - 2 * margin) + ")")
      .style('color', 'var(--light)') 
      .call(xAxis);

    // Animate the gauge
    valueIndicator
      .transition()
      .duration(2000)
      .attr("width", x(finalValue))



}

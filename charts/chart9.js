//Wrap your chart in a function with chosen name
export default function barChart() {
    var width = 500;
  var height = 500;
  var margin = {top: 20, right: 10, bottom: 20, left: 30};

var svg = d3.select("#bar_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom) 
  .append("g");

    var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]) ;

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        

        d3.csv("./charts/data/customer_satisfaction.csv").then(function(data) {
                
        
        xScale.domain(data.map(function(d) { return d.Cleanliness; }));
        yScale.domain([0, d3.max(data, function(d) { return d.Age; })]);
        
        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .attr('class', 'axis')
         .call(d3.axisBottom(xScale));
        
        g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
        return d;
        }).ticks(10))
        .attr('class', 'axis')
        .append("text")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .style('fill', 'white');

        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.Cleanliness); })
        .attr("y", function(d) { return yScale(d.Age); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.Age) })
        .style('fill', function (d) {
            if (d.x0 < 2) {
              return 'var(--accent)';
            } else {
              return 'var(--secondary)';
            }
          });

        });
  
}

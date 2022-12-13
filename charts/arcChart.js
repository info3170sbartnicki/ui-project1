export default function arcChart() {
function draw(domNode) {
  
  document.getElementById('arc-chart').innerHTML = '';
  
  var width = 360;
  var height = 360;
  
  var outerRadius = Math.min(width/2, (1/5) *height);
  var innerRadius = outerRadius *.75;
  
  var svg = d3.select("#arc-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${outerRadius},${outerRadius})`);

  var arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)
  .startAngle((-2 / 3) * Math.PI)
  .endAngle((2 / 3) * Math.PI);

  svg.append("path")
    .attr("class", "arc-background")
    .attr("d", arc);

  var progress = .67;
  var endAngle = (progress * (4 / 3) * Math.PI) + ((-2 / 3) * Math.PI)

  arc = arc.endAngle(endAngle);
  svg.append("path")
    .attr("class", "arc")
    .attr("d", arc);

  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('y', -10)
    .attr('id', 't1')
    .style('color', 'var(--light)') 
    .attr('font-size', 10)
    .text('40');

  function doResize() {
    var textNode = document.getElementById("t1");
    var bb = textNode.getBBox();
    var widthTransform = (innerRadius*2 *.9) / bb.width;
    var heightTransform = (innerRadius*2/3 *.9) / bb.height;
    var value = widthTransform < heightTransform ? widthTransform : heightTransform;
    var translate = value * 10; //10 px font
    textNode.setAttribute("transform", `matrix(${value}, 0, 0, ${value}, 0, ${translate})`);
  }

  doResize()
}

draw();
$(window).resize(draw);

d3.csv("./data/customer_satisfaction.csv").then( function(data) {
        for (let i = 0; i < data.length; i++) {
         var sum = data[i]['Customer Type'];
         console.log(d3.count(sum))
          //40 Loyal customers output
      }
    

});





}

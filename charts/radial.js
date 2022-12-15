export default function radialChart() {
document.getElementById('radial-chart').innerHTML = '';
//var wrapper = document.getElementById('progress');
var start = 0;
var end = parseFloat("40");

var colours = {
  fill: '#' + "FFA306",
  track: '#' + "573280",
  text: '#' + "ffffff",
  stroke: '#' + "573280",
}

var radius = 100;
var border = 24;
var strokeSpacing = 4;
var endAngle = Math.PI * 2;
var formatText = d3.format('.0%');
var boxSize = radius * 2;
var count = end;
var progress = start;
var step = end < start ? -0.01 : 0.01;


//retrieve data
d3.csv("./charts/data/customer_satisfaction.csv").then( function(data) {

    var sum = d3.count(data,function (d) { return d['Customer Type']; })
      console.log(sum)

      data.forEach(dataItem => {
                if (dataItem['Customer Type'].toLowerCase() === 'loyal customer') {
                    //var sum = d3.count(dataItem,function (d) { return d['Customer Type']; })
                    console.log(dataItem)
                } 
            })

//Define the circle
var circle = d3.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

//setup SVG wrapper
var svg = d3.select('#radial-chart')
  .append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

// ADD Group container
var g = svg.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

//Setup track
var track = g.append('g').attr('class', 'radial-progress');
track.append('path')
  .attr('class', 'radial-progress__background')
  .attr('fill', colours.track)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px')
  .attr('d', circle.endAngle(endAngle));

//Add colour fill
var value = track.append('path')
  .attr('class', 'radial-progress__value')
  .attr('fill', colours.fill)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px');

//Add text value
var numberText = track.append('text')
  .attr('class', 'radial-progress__text')
  .attr('fill', colours.text)
  .attr('text-anchor', 'middle')
  .attr('dy', '.5rem');

function update(progress) {
  //update position of endAngle
  value.attr('d', circle.endAngle(endAngle * progress));
  //update text value
  numberText.text(formatText(progress));
} 

(function iterate() {
  //call update to begin animation
  update(progress);
  if (count > 0) {
    //reduce count till it reaches 0
    count--;
    //increase progress
    progress += step;
    //Control the speed of the fill
    setTimeout(iterate, 10);
  }
})();

});

}

export default function radialChart() {
//retrieve data
d3.csv("./charts/data/customer_satisfaction.csv").then( function(data) {

    
    data.forEach(dataItem => {
                if (dataItem['Customer Type'].toLowerCase() === 'loyal customer') {
                    var countCustomers = (dataItem,function (d) { return d['Customer Type'].toLowerCase() === 'loyal customer'; })

                    //var count = d3.sum(dataItem,function (d) {return data['Customer Type'].toLowerCase() === 'Loyal customer'})
                    console.log( countCustomers) //this outputs 40 values (therefore there are 40 loyal customers)
                } 
                
            })
    
var container = document.getElementById('progress');
var beginning = 0;
var end = 40; // this is the value that the chart fills up to (amount of loyal customers calculated above)

var colours = {
  fill: '#' + "FFA306",
  track: '#' + "573280",
  text: '#' + "000000",
  stroke: '#' + "FFFFFF",
}

var radius = 100;
var border = 12;
var strokeSpacing = 4;
var endAngle = Math.PI * 2;
var formatText = d3.format('.0');
var boxSize = radius * 2;
var count = end;
var progress = beginning;
var step = end < beginning ? -0.01 : 0.01;


//Create the circle
var circle = d3.arc()
  .beginningAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

//SVG container
var svg = d3.select(container)
  .append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

// Group container
var g = svg.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

//Tracking 
var track = g.append('g').attr('class', 'radial-progress');
track.append('path')
  .attr('class', 'radial-progress__background')
  .attr('fill', colours.track)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px')
  .attr('d', circle.endAngle(endAngle));

//Adding colour to fill
var value = track.append('path')
  .attr('class', 'radial-progress__value')
  .attr('fill', colours.fill)
  .attr('stroke', colours.stroke)
  .attr('stroke-width', strokeSpacing + 'px');

//Add text value
var numberText = track.append('text')
  .attr('class', 'radial-progress')
  .attr('fill', colours.text)
  .attr('text-anchor', 'middle')
  .attr('dy', '.5rem');

function update(progress) {
  //update position of endAngle
  value.attr('d', circle.endAngle(endAngle * progress));
  //update text value
  numberText.text(formatText(progress) * 100);
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

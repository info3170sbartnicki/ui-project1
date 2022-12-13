export default function progressbarChart() {
function radialProgress(selector) {
  const parent = d3.select(selector)
  const size = parent.node().getBoundingClientRect()
  const svg = parent.append('svg')
    .attr('width', size.width)
    .attr('height', size.height);
  const outerRadius = Math.min(size.width, size.height) * 0.45;
  const thickness = 10;
  let value = 0;
  
  const mainArc = d3.arc()
    .startAngle(0)
    .endAngle(Math.PI * 2)
    .innerRadius(outerRadius-thickness)
    .outerRadius(outerRadius)

  svg.append("path")
    .attr('class', 'progress-bar-bg')
    .attr('transform', `translate(${size.width/2},${size.height/2})`)
    .attr('d', mainArc())
  
  const mainArcPath = svg.append("path")
    .attr('class', 'progress-bar')
    .attr('transform', `translate(${size.width/2},${size.height/2})`)
  
  svg.append("circle")
    .attr('class', 'progress-bar')
    .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
    .attr('width', thickness)
    .attr('height', thickness)
    .attr('r', thickness/2)

  const end = svg.append("circle")
    .attr('class', 'progress-bar')
    .attr('transform', `translate(${size.width/2},${size.height/2-outerRadius+thickness/2})`)
    .attr('width', thickness)
    .attr('height', thickness)
    .attr('r', thickness/2)
  
  let percentLabel = svg.append("text")
    .attr('class', 'progress-label')
    .attr('transform', `translate(${size.width/2},${size.height/2})`)
    .text('0')

  return {
    update: function(progressPercent) {
      const startValue = value
      const startAngle = Math.PI * startValue / 50
      const angleDiff = Math.PI * progressPercent / 50 - startAngle;
      const startAngleDeg = startAngle / Math.PI * 180
      const angleDiffDeg = angleDiff / Math.PI * 180
      const transitionDuration = 1500

      mainArcPath.transition().duration(transitionDuration).attrTween('d', function(){
        return function(t) {
          mainArc.endAngle(startAngle + angleDiff * t)
          return mainArc();
        }
      })
      end.transition().duration(transitionDuration).attrTween('transform', function(){
        return function(t) {
          return `translate(${size.width/2},${size.height/2})`+
            `rotate(${(startAngleDeg + angleDiffDeg * t)})`+
            `translate(0,-${outerRadius-thickness/2})`
        }
      })
      percentLabel.transition().duration(transitionDuration).tween('bla', function() {
        return function(t) {
          percentLabel.text(Math.round(startValue + (progressPercent - startValue) * t));
        }
      })
      value = progressPercent
    }
  }
}

d3.csv("./data/customer_satisfaction.csv").then( function(data) {
        for (let i = 0; i < data.length; i++) {
         var sum = data[i]['Customer Type'];
         console.log(d3.count(sum))
          //40 Loyal customers output
      }
     
                  
    

let chart = radialProgress('.widget')
let progress = [40]
let state = 0
d3.interval(function(){
  chart.update(progress[state])
  state = (state + 1) % progress.length
}, 2000)

});





}
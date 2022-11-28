//Wrap your chart in a function with chosen name
export default function areaChart() {
  var svgwidth = 400;
  var svgheight = 400;
  var padding = 100;

  var svg = d3
    .select('#area_chart') //This #area_chart div doesn't exist yet, please add a name of it to array in main.js so it's automatically generated
    .append('svg')
    .attr('width', svgwidth)
    .attr('height', svgheight);

  var inner_width = svgwidth - padding;
  var inner_height = svgheight - padding;

  var g = svg
    .append('g')
    .attr('transform', 'translate(50, 50)')
    .attr('class', 'graph');

  var parseTime = d3.timeParse('%d/%m/%Y');
  var xscale = d3.scaleTime().range([0, inner_width]);
  var yscale = d3.scaleLinear().range([inner_height, 0]);

  d3.csv('./charts/data/tesla.csv').then(function (data) {
    data.forEach(function (d) {
      d.date = parseTime(d.date);
      d.price = parseInt(d.price);
    });

    xscale.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );

    var xaxis = d3.axisBottom().scale(xscale);

    g.append('g')
      .call(xaxis.tickFormat(d3.timeFormat('%d-%m-%Y')))
      .attr('transform', 'translate(0, ' + inner_height + ')')
      .style('font-size', '7px')
      .style('color', 'var(--light)') //You can color axis either manually by adding our var color to it, or just add class to it (check y-axis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-25)');

    yscale.domain(
      d3.extent(data, function (d) {
        return d.price;
      })
    );

    var yaxis = d3.axisLeft().scale(yscale);

    g.append('g').call(yaxis).attr('class', 'axis'); //You can just add 'axis' class to your axis to make it light

    var generateArea = d3.area();

    g.append('path')
      .datum(data)
      .attr(
        'd',
        generateArea
          .x(function (d) {
            return xscale(d.date);
          })
          .y0(inner_height)
          .y1(function (d) {
            return yscale(d.price);
          })
      )
      .attr('fill', '#cce5df')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5);
  });
}

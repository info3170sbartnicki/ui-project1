// Chart 3 - Histogram
// Sylwester Bartnicki
export default function histogram() {
  // Declaring initial variables
  let svgwidth = 400;
  let svgheight = 400;
  let padding = 100;

  let inner_width = svgwidth - padding;
  let inner_height = svgheight - padding;

  //Inserting dropdown
  let dropdown = d3.select('#histogram').append('div').attr('id', 'dropdown');

  dropdown._groups[0][0].innerHTML = `
    <select id="dropdown">
      <option value="Inflight wifi service" selected>Inflight wifi service</option>
      <option value="Food and drink">Food and drink</option>
      <option value="Seat comfort">Seat comfort</option>
      <option value="Inflight entertainment">Inflight entertainment</option>
      <option value="Leg room service">Leg room service</option>
    </select>
  `;
  // Fetching data from CSV
  d3.csv('./charts/data/customer_satisfaction.csv').then(function (data) {
    let categories = [
      'Inflight wifi service',
      'Food and drink',
      'Seat comfort',
      'Inflight entertainment',
      'Leg room service',
    ];

    let cat = categories[0]; // Initial selected category
    let scores = []; // Array for storing scores from selected category
    // Populating scores with data
    data.forEach(function (d) {
      scores.push({ [cat]: d[cat] });
    });

    // Appending svg to chart's div wrapper
    let svg = d3
      .select('#histogram')
      .append('svg')
      .attr('id', 'hist_svg')
      .attr('viewBox', `0 0 ${svgwidth} ${svgheight}`)
      .attr('preserveAspectRatio', 'xMidYMid');

    // Chart Title
    svg
      .append('text')
      .text('Satisfaction Level by Category')
      .attr('stroke', 'var(--light)')
      .attr('transform', `translate(${svgwidth / 2}, 20)`)
      .attr('text-anchor', 'middle');

    // Creating main group
    let g = svg
      .append('g')
      .attr('transform', 'translate(50, 50)')
      .attr('class', 'graph');

    let xscale = d3.scaleLinear().range([0, inner_width]);
    let yscale = d3.scaleLinear().range([inner_height, 0]);

    xscale.domain([1, 6]);

    let xaxis = d3.axisBottom().scale(xscale);

    g.append('g')
      .call(xaxis.tickFormat('').ticks(5))
      .attr('transform', 'translate(0, ' + inner_height + ')')
      .style('font-size', '7px')
      .style('color', 'var(--light)')
      // X Axis Label
      .append('text')
      .text('Satisfaction score')
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('x', inner_width / 2)
      .attr('y', 30)
      .attr('fill', 'var(--light)');

    const histogram = d3
      .histogram()
      .value(function (d) {
        return d[cat];
      })
      .domain(xscale.domain())
      // .domain([1, 6])
      .thresholds(xscale.ticks(5));

    let bins = histogram(scores);

    bins.pop();

    yscale.domain([0, d3.max(bins, (d) => d.length)]);

    var yaxis = d3.axisLeft().scale(yscale);
    g.append('g')
      .call(yaxis)
      .attr('class', 'axis')
      .attr('id', 'yaxis')

      // Y Axis Label
      .append('text')
      .text('No. of customers')
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--light)')
      .attr('font-size', 11)
      .attr('x', -inner_height / 2)
      .attr('y', -30)
      .attr('transform', 'rotate(-90)');

    //Declaring gradient for bar fill
    let defs = svg.append('defs');
    let gradient = defs
      .append('linearGradient')
      .attr('id', 'svgGradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '100%');
    gradient
      .append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', 'var(--main)')
      .attr('stop-opacity', 1);
    gradient
      .append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', 'var(--accent)')
      .attr('stop-opacity', 1);

    g.selectAll('group')
      .data(bins)
      .join('g')
      .attr('class', 'hist_group')
      .append('rect')
      .attr('class', 'hist')
      .attr('width', function (d) {
        return xscale(d.x1) - xscale(d.x0);
      })
      .attr('height', 0)
      .attr('stroke', 'var(--dark)')
      .attr('transform', function (d) {
        return `translate(${xscale(d.x0)}, ${yscale(0)})`;
      })
      .attr('fill', function (d) {
        if (d.length < 20) {
          return 'url(#svgGradient)';
        } else {
          return 'url(#svgGradient)';
        }
      });
    // Appending x-axis custom labels for 1,2,3,4,5 scores
    d3.selectAll('.hist_group')
      .append('text')
      .text((d) => `[${d.x0}]`)
      .attr('x', (d) => xscale(d.x1) - (xscale(d.x1) - xscale(d.x0)) / 2)
      .attr('y', yscale(-1.3))
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('fill', 'var(--light)');

    d3.selectAll('rect.hist')
      .transition()
      .duration(2000)
      .attr('height', function (d) {
        return inner_height - yscale(d.length);
      })
      .attr('transform', function (d) {
        return `translate(${xscale(d.x0)}, ${yscale(d.length)})`;
      });

    d3.select('#dropdown').on('change', (e) => {
      e.preventDefault();
      cat = e.target.value;
      console.log(cat);
      scores = [];
      data.forEach(function (d) {
        scores.push({ [cat]: d[cat] });
      });

      bins = histogram(scores);
      yscale.domain([0, d3.max(bins, (d) => d.length)]);
      d3.axisLeft().scale(yscale);
      g.select('#yaxis').transition().duration(1500).call(yaxis);
      d3.selectAll('rect.hist')
        .data(bins)
        .transition()
        .duration(1500)
        .attr('height', function (d) {
          return inner_height - yscale(d.length);
        })
        .attr('transform', function (d) {
          return `translate(${xscale(d.x0)}, ${yscale(d.length)})`;
        });
    });
  });
}

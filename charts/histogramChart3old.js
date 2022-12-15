//Wrap your chart in a function with chosen name
export default function histogram() {
  var svgWidth = 500,
    svgHeight = 500,
    padding = 100;

  var inner_width = svgWidth - padding;
  var inner_height = svgHeight - padding;

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

  d3.csv('./charts/data/customer_satisfaction.csv').then(function (data) {
    let categories = [
      'Inflight wifi service',
      'Food and drink',
      'Seat comfort',
      'Inflight entertainment',
      'Leg room service',
    ];

    let cat = categories[0]; // selected category
    let scores = [];

    d3.select('#dropdown').on('change', (e) => {
      e.preventDefault();
      cat = e.target.value;
      console.log(cat);
      d3.select('#hist_svg').remove();
      scores = [];
      data.forEach(function (d) {
        scores.push({ [cat]: d[cat] });
      });
      draw();
    });

    data.forEach(function (d) {
      scores.push({ [cat]: d[cat] });
    });

    function draw() {
      var svg = d3
        .select('#histogram')
        .append('svg')
        .attr('id', 'hist_svg')
        .attr('viewBox', '0 0 500 500');
      // .attr('height', svgHeight)
      // .attr('width', svgWidth);

      const g = svg.append('g').attr('transform', `translate(50,50)`);
      const xscale = d3.scaleLinear().domain([1, 5]).range([0, inner_width]);

      const xaxis = g
        .append('g')
        .attr('transform', 'translate(0,' + inner_height + ')')
        .call(d3.axisBottom(xscale))
        // .tickFormat((x) => `${x.toFixed(3)}`)
        .attr('class', 'axis');
      const histogram = d3
        .histogram()
        .value(function (d) {
          return d[cat];
        })
        // .domain(xscale.domain())
        .domain([1, 6])
        .thresholds(xscale.ticks(5));

      const bins = histogram(scores);

      const yscale = d3
        .scaleLinear()
        .range([inner_height, 0])
        .domain([
          0,
          d3.max(bins, function (d) {
            return d.length;
          }),
        ]);
      const yaxis = g
        .append('g')
        .call(d3.axisLeft(yscale))
        .attr('class', 'axis');

      // g.selectAll('g').data(bins).join('g').attr('class', 'hist_group');

      let group = g
        .selectAll('group')
        .data(bins)
        .join('g')
        .attr('class', 'hist_group')
        .append('rect')
        .attr('width', function (d) {
          return xscale(d.x1) - xscale(d.x0);
        })
        .attr('height', function (d) {
          return inner_height - yscale(d.length);
        })
        .attr('transform', function (d) {
          return `translate(${xscale(d.x0)}, ${yscale(d.length)})`;
        })
        .style('fill', function (d) {
          if (d.x0 < 2) {
            return 'var(--accent)';
          } else {
            return 'var(--secondary)';
          }
        });
      console.log(bins);
      d3.selectAll('.hist_group')
        .append('text')
        .attr('x', (d) => xscale(d.x0) - (xscale(d.x1) - xscale(d.x0)) / 2)
        .attr('y', yscale(-1.2))
        .attr('fill', 'white')
        .text('test');
    }
    draw();
  });
}

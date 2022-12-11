export default function lineChart() {

    let chart = {
        width: 1000,
        height: 500,
        padding: 100
    }

    var svg = d3.select("#line_chart")
        .append('svg')
        .attr('width', chart.width)
        .attr('height', chart.height)
        .attr('viewBox',
            '0 0 ' + chart.width + ' ' + chart.height
        )
        .attr('preserveAspectRatio', 'xMidYMid meet');

    chart.innerWidth = chart.width - chart.padding;
    chart.innerHeight = chart.height - chart.padding;

    var g = svg.append("g")
        .attr("transform", "translate(50, 50)")
        .attr("class", "graph");
    //2/01/2022

    const lineChartTip = d3.select("#line_chart").append("div")
        .attr('class', 'line-tip')
        .style("opacity", 0);

    var xscale = d3.scaleLinear().range([0, chart.innerWidth]);
    var yscale = d3.scaleLinear().range([chart.innerHeight, 0]);

    d3.csv("./charts/data/customer_satisfaction.csv").then(data => {
        data.forEach(function(d) {
            d['Flight Distance'] = parseInt(d['Flight Distance']);
            d.id = parseInt(d.id);
        });

        xscale.domain(d3.extent(data, dataItem => {
            return dataItem.id
        }));

        var xaxis = d3.axisBottom()
            .scale(xscale);

        g.append("g")
            .attr("transform", "translate(0, " + chart.innerHeight + ")")
            .call(xaxis)
            .style("font-size", "8px")
            .style('color', 'var(--main)')
            .selectAll('text')
            .attr("transform", "rotate(-25)")
            .style("text-anchor", "end");

        yscale.domain(d3.extent(data, function(d){
            return d['Flight Distance'];
        }));

        var yaxis = d3.axisLeft()
            .scale(yscale);

        g.append("g")
            .call(yaxis)
            .style('color', 'var(--main)')
            .attr('class', 'axis');

        var generateLine = d3.line();

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "var(--accent)")
            .attr("stroke-width", 1.5)
            .attr("d", generateLine
                .x(function(d){return xscale(d.id)})
                .y(function(d){return yscale(d['Flight Distance'])})
            );

        let circle = g.append("g");

        circle.selectAll("circle")
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'circles')
            .append('circle')
            .attr("cx", function(d){ return xscale(d.id)} )
            .attr("cy", function(d){ return yscale(d['Flight Distance'])})
            .attr("r", 4)
            .attr("fill", 'var(--light)')
            .attr("stroke", 'none');

        circle.selectAll('.circles')
            .on('mouseover', (d, i) => {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');
                lineChartTip.transition()
                    .duration(50)
                    .style("opacity", 1);
                console.log('d: ', d);
                const content = d.target.__data__['Flight Distance'].toString();
                lineChartTip.html(content)
                    .style("left", (d.pageX + 10) + "px")
                    .style("top", (d.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                lineChartTip.transition()
                    .duration('50')
                    .style("opacity", 0);
            });
    })
}
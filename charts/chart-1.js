export default function lineChart() {

    let chart = {
        width: 1000,
        height: 500,
        padding: 100
    }

    chart.innerWidth = chart.width - chart.padding;
    chart.innerHeight = chart.height - chart.padding;

    const lineChartTip = d3.select("#line_chart").append("div")
        .attr('class', 'line-tip')
        .style("opacity", 0);

    var svgWrapper = d3.select("#line_chart")
    .append('svg')
    .attr('id', 'svg')
    .attr('width', chart.width)
    .attr('height', chart.height)
    .attr('viewBox',
        '0 0 ' + chart.width + ' ' + chart.height
    )
    .attr('preserveAspectRatio', 'xMidYMid meet');

    var svg = d3.select("#line_chart #svg");

    const plotArea = svg.append("g")
        .attr("transform", "translate(50, 50)");

    const clippingRect = plotArea
        .append("clipPath")
        .attr("id", "clippy")
        .append("rect")
        .attr("width",chart.innerWidth)
        .attr("height",chart.innerHeight)
        .attr("fill","none")

    d3.csv("./charts/data/customer_satisfaction.csv").then(data => {

        data.forEach(function(d) {
            d['Flight Distance'] = parseInt(d['Flight Distance']);
            d.id = parseInt(d.id);
        });

        const x = d3.scaleLinear().range([0,chart.innerWidth]).domain(d3.extent(data, dataItem => {
            return dataItem.id
        }));
        let x2 = x.copy();
        const y = d3.scaleLinear().range([chart.innerHeight,0]).domain(d3.extent(data, dataItem => {
            return dataItem['Flight Distance'];
        }));

        plotArea.append("text")
            .attr("class", "x-label")
            .attr("fill", "var(--light)")
            .attr("text-anchor", "end")
            .attr("x", chart.innerWidth / 2)
            .attr("y", chart.innerHeight + 35)
            .text("Customer ID");

        plotArea.append("text")
            .attr("class", "y-label")
            .attr("fill", "var(--light)")
            .attr("text-anchor", "end")
            .attr("y", -30)
            .attr('x', 60)
            .attr("dy", ".75em")
            .text("Flight Distance");

        const line = d3.line()
            .x(d => x2(d.id))
            .y(d => y(d['Flight Distance']));

        const xAxis = d3.axisBottom(x2);
        const xAxisG = plotArea.append("g")
            .attr("transform","translate("+[0, chart.innerHeight]+")")
            .call(xAxis)
            .style('color', 'var(--main)');

        const yAxis = d3.axisLeft(y);
        const yAxisG = plotArea.append("g").call(yAxis)
            .style('color', 'var(--main)')
            .attr('class', 'axis');


        const path = plotArea.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "var(--accent)")
            .attr("stroke-width", 1.5)
            .attr("d", line)
            .attr("clip-path","url(#clippy)")

        const circle = plotArea.append("g");

        circle.selectAll("circle")
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'circles')
            .append('circle')
            .attr("cx", function(d){ return x(d.id)} )
            .attr("cy", function(d){ return y(d['Flight Distance'])})
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


        const zoom = d3.zoom()
            .on("zoom", function(event) {
                x2 = event.transform.rescaleX(x);
                xAxisG.call(xAxis.scale(x2));
                path.attr("d", line);

                plotArea.selectAll('circle')
                    .attr('cx', function(d) {return x2(d.id)});
            })

        svg.call(zoom);
    })

}
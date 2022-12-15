export default function donutChart() {
    const chart = {
        width: 600,
        height: 500,
        padding: 200,
        holeRadius: 100,
        legendRectSize: 13,
        legendSpacing: 7
    }

    const color = d3.scaleOrdinal()
        .range(["var(--main)", "var(--secondary)"]);

    chart.radius = Math.min(chart.width, chart.height) / 2;

    const svg = d3.select("#donut-chart")
        .append('svg')
        .attr('width', chart.width)
        .attr('height', chart.height)
        .append('g')
        .attr('transform', 'translate(' + (chart.width / 2) + ',' + (chart.height / 2) + ')');

    const arc = d3.arc()
        .innerRadius(chart.radius - chart.holeRadius)
        .outerRadius(chart.radius);

    const pie = d3.pie()
        .value(d => d.averageSatisfaction)
        .sort(null);

    d3.csv("./charts/data/customer_satisfaction.csv")
        .then(data => {

            const donutData = [
                {
                    title: 'Business Travel',
                    totalCustomers: 0,
                    sumSatisfaction: 0,
                    averageSatisfaction: 0
                },
                {
                    title: 'Personal travel',
                    totalCustomers: 0,
                    sumSatisfaction: 0,
                    averageSatisfaction: 0
                }
            ]

            data.forEach(dataItem => {
                if (dataItem['Type of Travel'].toLowerCase() === 'business travel') {
                    donutData[0].sumSatisfaction += parseInt(dataItem['Average Satisfaction']);
                    donutData[0].totalCustomers++;
                } else {
                    donutData[1].sumSatisfaction += parseInt(dataItem['Average Satisfaction']);
                    donutData[1].totalCustomers++;
                }
            })

            donutData[0].averageSatisfaction = parseFloat((donutData[0].sumSatisfaction / donutData[0].totalCustomers).toFixed(2));
            donutData[1].averageSatisfaction = parseFloat((donutData[1].sumSatisfaction / donutData[1].totalCustomers).toFixed(2));

            const donutTip = d3.select("#donut-chart").append("div")
                .attr('class', 'donut-tip')
                .style("opacity", 0);

            const path = svg.selectAll('path')
                .data(pie(donutData))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function (d, i) {
                    return color(d.data.title);
                })
                .attr('transform', 'translate(0, 0)')
                .on('mouseover', (d, i) => {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '.85');
                    donutTip.transition()
                        .duration(50)
                        .style("opacity", 1);
                    const num = d.target.__data__.data.averageSatisfaction.toString();
                    donutTip.html(num)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");

                })
                .on('mouseout', function (d, i) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
                    donutTip.transition()
                        .duration('50')
                        .style("opacity", 0);
                });

            const legend = svg.selectAll('.legend') //the legend and placement
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'circle-legend')
                .attr('transform', function (d, i) {
                    var height = chart.legendRectSize + chart.legendSpacing;
                    var offset = height * color.domain().length / 2;
                    var horz = -2 * chart.legendRectSize - 13;
                    var vert = i * height - offset;
                    return 'translate(' + horz + ',' + vert + ')';
                });
            legend.append('circle') //keys
                .style('fill', color)
                .style('stroke', color)
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', '.5rem');
            legend.append('text') //labels
                .style('stroke', 'var(--light)')
                .attr('x', chart.legendRectSize + chart.legendSpacing)
                .attr('y', chart.legendRectSize - chart.legendSpacing)
                .text(function (d) {
                    return d;
                });

        })
}
export default function chart4() {
  // title
  let title = d3.select("#scatterPlotChart4").append("div").attr("id", "title");

  title._groups[0][0].innerHTML = `
  <h3>Relationship of Total Delay minutes and Departure/arrival time convenient satisfactory</h2>
  `;

  // create buttons
  let button1 = d3
    .select("#scatterPlotChart4")
    .append("div")
    .attr("id", "button1");
  let button2 = d3
    .select("#scatterPlotChart4")
    .append("div")
    .attr("id", "button2");

  button1._groups[0][0].innerHTML = `
  <button id ="button">Departure Delay in Minutes</button>
  `;
  button2._groups[0][0].innerHTML = `
  <button id ="button">Arrival Delay in Minutes</button>
  `;

  // buttons functions
  button1.on("click", function () {
    updateData("Departure Delay in Minutes");
    d3.selectAll("#dot").remove();
  });

  button2.on("click", function () {
    updateData("Arrival Delay in Minutes");
    d3.selectAll("#dot").remove();
  });

  // width/height variables
  var margin = { top: 20, right: 50, bottom: 80, left: 65 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // svg
  var svg = d3
    .select("#scatterPlotChart4")
    .append("svg")
    .attr("id", "hist_svg")
    .attr("width", width + 20 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // x and y
  var x = d3.scaleLinear().domain([0, 180]).range([0, width]);

  // label x
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("transform", "rotate(0)")
    .attr("x", 200)
    .attr("y", 40)
    .attr("fill", "#000")
    .style("font-size", "15px")
    .text("Delay in Minutes");

  var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);

  // label y
  svg.append("g").call(d3.axisLeft(y));
  svg
    .append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -60)
    .attr("y", -40)
    .attr("fill", "#000")
    .style("font-size", "15px")
    .text("Total Departure and Arrival Delay in Minutes");

  function updateData(selectedGroup) {
    d3.csv("./charts/data/customer_satisfaction.csv").then(function (data) {
      // colors
      var category = d3
        .scaleOrdinal()
        .domain(["Cosmetic", "Electronics"])
        .range(["#552a4f", "#92e2f9"]);

      // map through data
      var dataFilter = data.map(function (d) {
        return {
          time: d[selectedGroup],
          value: d["Total Departure and Arrival Delay in Minutes"],
        };
      });

      // dot
      var dot = svg
        .selectAll("square")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", "dot")
        .attr("cx", function (d) {
          return x(+d.time);
        })
        .attr("cy", function (d) {
          return y(+d.value);
        })
        .attr("r", 7)
        .style("fill", (d) => category(d.satisfaction));

      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
          return x(+d.time);
        })
        .attr("cy", function (d) {
          return y(+d.value);
        });

      // brushing
      svg.call(
        d3
          .brush()
          .extent([
            [0, 0],
            [width, height],
          ])
          .on("start brush", updateChart)
      );

      function updateChart(event) {
        var selection = event.selection;

        dot.classed("selected", function (d) {
          return isBrushed(selection, x(d.time) + 10, y(d.value) + 1);
        });
      }

      function isBrushed(edge, cx, cy) {
        var x0 = edge[0][0],
          x1 = edge[1][0],
          y0 = edge[0][1],
          y1 = edge[1][1];

        return x0 <= cx && x1 >= cx && y0 <= cy && y1 >= cy;
      }
    });
  }

  // bar
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .append("text")
    .attr("x", 100)
    .attr("y", 70)
    .attr("fill", "#000")
    .style("font-size", "15px")
    .text("satisfied");

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .append("text")
    .attr("x", 200)
    .attr("y", 70)
    .attr("fill", "#000")
    .style("font-size", "15px")
    .text("neutral or dissatisfied");

  svg
    .append("circle")
    .attr("id", "circleBar")
    .attr("cx", 185)
    .attr("cy", 465)
    .attr("r", 8)
    .style("fill", "#92e2f9");
  svg
    .append("circle")
    .attr("id", "circleBar")
    .attr("cx", 85)
    .attr("cy", 465)
    .attr("r", 8)
    .style("fill", "#552a4f");

  updateData("Arrival Delay in Minutes");
}

//Wrap your chart in a function with chosen name
export default function chart4() {
  var margin = { top: 50, right: 100, bottom: 50, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#chart4part1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("./charts/data/customer_satisfaction.csv").then(function (data) {
    // List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB", "valueC"];

    // add the options to the button
    d3.select("#selectButton")
      .selectAll("myOptions")
      .data(allGroup)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // text showed in the menu
      .attr("value", function (d) {
        return d;
      }); // corresponding value returned by the button

    // Add X axis --> it is a date format
    var x = d3.scaleLinear().domain([0, 300]).range([0, width - 70]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", 150)
      .attr("y", 40)
      .attr("fill", "#000")
      .style("font-size", "15px")
      .text("Total Departure and Arrival Delay in Minutes");
    // Add Y axis
    var y = d3.scaleLinear().domain([0, 120]).range([height, 0]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "title")
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", -60)
      .attr("y", -330)
      .attr("fill", "#000")
      .style("font-size", "10px")
      .text(
        "Relationship of Total Delay minutes and Departure time convenient satisfactory"
      );

      svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("x", 400)
      .attr("y", -150)
      .attr("fill", "#000")
      .style("font-size", "15px")
      .text("satisfied");

    svg
      .append("circle")
      .attr("cx", 385)
      .attr("cy", 145)
      .attr("r", 8)
      .style("fill", "#552a4f");

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("x", 400)
      .attr("y", -120)
      .attr("fill", "#000")
      .style("font-size", "15px")
      .text("neutral or dissatisfied");

    svg
      .append("circle")
      .attr("cx", 385)
      .attr("cy", 175)
      .attr("r", 8)
      .style("fill", "#92e2f9");


    // Add Y axis

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -100)
      .attr("y", -40)
      .attr("fill", "#000")
      .style("font-size", "15px")
      .text("Departure Delay in Minutes");

    // Initialize line with group a
    var category = d3
      .scaleOrdinal()
      .domain(["Cosmetic", "Electronics"])
      .range(["#92e2f9", "#552a4f"]);
    // Initialize dots with group a
    var dot = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(+d["Total Departure and Arrival Delay in Minutes"]);
      })
      .attr("cy", function (d) {
        return y(+d["Departure Delay in Minutes"]);
      })
      .attr("r", 7)
      .style("fill", (d) => category(d.satisfaction));

    // A function that update the chart
    function update(selectedGroup) {
      // Create new data with the selection?
      var dataFilter = data.map(function (d) {
        return {
          time: d["Total Departure and Arrival Delay in Minutes"],
          value: d[selectedGroup],
        };
      });

      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(+d["Total Departure and Arrival Delay in Minutes"]);
            })
            .y(function (d) {
              return y(+d.value);
            })
        );
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
          return x(+d["Total Departure and Arrival Delay in Minutes"]);
        })
        .attr("cy", function (d) {
          return y(+d.value);
        });
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function (d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value");
      // run the updateChart function with this selected option
      update(selectedOption);
    });

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
      selection = event.selection;

      circle.classed("selected", function (d) {
        return isBrushed(
          selection,
          xscale(d["Arrival Delay in Minutes"]) + 50,
          yscale(d["Departure Delay in Minutes"]) + 50
        );
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

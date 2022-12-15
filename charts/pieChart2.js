//Wrap your chart in a function with chosen name
export default function pieChart2() {
  // title
  let title = d3.select("#pieChart2").append("div").attr("id", "title");

  title._groups[0][0].innerHTML = `
  <h3>Relationship of Total Delay minutes and Departure/arrival time convenient satisfactory</h2>
  `;

  async function handleData() {
    const dataCsv = await d3.csv("./charts/data/customer_satisfaction.csv");
    // calculate total for business and personal travelers
    var totalB = 0;
    var totlaP = 0;

    function totalBusinessTravel() {
      for (let i = 0; i < dataCsv.length; i++) {
        if (dataCsv[i]["Type of Travel"] == ["Business travel"]) {
          totalB += 1;
        }
      }
      return totalB;
    }
    function totalPersonalTravel() {
      for (let i = 0; i < dataCsv.length; i++) {
        if (dataCsv[i]["Type of Travel"] == ["Personal Travel"]) {
          totlaP += 1;
        }
      }
      return totlaP;
    }
    //console.log(totalBusinessTravel());
    //console.log(totalPersonalTravel());

    var businessTravel = dataCsv[0]["Type of Travel"];
    var personalTravel = "";

    function name() {
      const iterator = dataCsv.values();

      for (let i = 0; i < dataCsv.length; i++) {
        if (businessTravel != dataCsv[i]["Type of Travel"]) {
          personalTravel = dataCsv[i]["Type of Travel"];
          return personalTravel;
        }
      }
    }

    const data = [
      { name: businessTravel, share: totalBusinessTravel() },
      { name: name(), share: totalPersonalTravel() },
    ];

    // width/height variables
    var width = 700;
    var height = 450;
    var radius = 200;

    // svg
    const svg = d3
      .select("#pieChart2")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

    // color
    var ordScale = d3.scaleOrdinal().domain(data).range(["#6257a1", "#a0acf9"]);

    // pie generator
    var pie = d3.pie().value(function (d) {
      return d.share;
    });

    var arc = g.selectAll("arc").data(pie(data)).enter();

    // fill pie
    var path = d3.arc().outerRadius(radius).innerRadius(0);

    arc
      .append("path")
      .transition()
      .duration(1500)
      .attr("d", path)
      .attr("fill", function (d) {
        return ordScale(d.data.name);
      });

    // labels
    var label = d3.arc().outerRadius(radius).innerRadius(0);

    arc
      .append("text")
      .transition()
      .duration(1500)
      .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
      })
      .text(function (d) {
        return d.data.share;
      })
      .style("font-family", "arial")
      .attr("fill", "var(--light)")
      .style("font-size", 15);

    // bar
    svg
      .append("circle")
      .attr("cx", 455)
      .attr("cy", 200)
      .attr("r", 8)
      .style("fill", "#6257a1");
    svg
      .append("circle")
      .attr("cx", 455)
      .attr("cy", 235)
      .attr("r", 8)
      .style("fill", "#a0acf9");

    svg
      .append("text")
      .attr("x", 470)
      .attr("y", 200)
      .text("Business Travel")
      .attr("fill", "var(--light)")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 470)
      .attr("y", 235)
      .text("Personal Travel")
      .attr("fill", "var(--light)")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
  }

  handleData();
}

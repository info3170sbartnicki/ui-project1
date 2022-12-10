export default function chart2() {
  async function handleData() {
    const dataCsv = await d3.csv("./charts/data/customer_satisfaction.csv");
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
      { name: businessTravel, value: totalBusinessTravel() },
      { name: name(), value: totalPersonalTravel() },
    ];

    const dimensions = {
      width: 600,
      height: 500,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
      },
    };

    dimensions.boundedWidth = dimensions.width;
    dimensions.boundedHeight = dimensions.height;

    const svg = d3
      .select("#chart2")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
    //title
    svg
      .append("text")
      .attr("class", "title")
      .attr("transform", "translate(200,0)")
      .attr("x", -150)
      .attr("y", 50)
      .style("font-size", "15px")
      .text("The proportion of Type of travel of customer responded");

    //labels
    svg
      .append("circle")
      .attr("cx", 405)
      .attr("cy", 320)
      .attr("r", 8)
      .style("fill", "#6257a1");
    svg
      .append("circle")
      .attr("cx", 405)
      .attr("cy", 285)
      .attr("r", 8)
      .style("fill", "#a0acf9");

    svg
      .append("text")
      .attr("x", 420)
      .attr("y", 320)
      .text("Business travel")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 420)
      .attr("y", 285)
      .text("Personal Travel")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");

    const pieData = d3

      .pie()
      .value((d) => d.value)
      .sort((a, b) => a.value - b.value)(data);
      
    const color = d3.scaleOrdinal(["#6257a1", "#a0acf9"]);

    const arcGroup = svg
      .append("g")
      .attr("transform", "translate(180, 300)")
      .selectAll("path")
      .data(pieData);

    const allCount = data.reduce((pre, cur) => pre + cur.value, 20000);

    const roseArc = d3
      .arc()
      .innerRadius(0)
      .outerRadius((d) => {
        return (d.value / allCount) * 200 + 160;
      });

    arcGroup
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", roseArc);

    arcGroup
      .join("text")
      .style("font-size", "15px")
      .text((d) => d.data.value)
      .transition()
      .duration(1500)
      .attr("transform", function (d) {
        const angle = (d.endAngle * 140) / 2;
        const dAngle = d.endAngle - d.startAngle + 150;

        let tAngle = angle - dAngle;

        let tx = 90; //
        if (tAngle > 100) {
          tAngle = -20;
          tx = -100; //
        }
        return `rotate(${tAngle})
            translate(${tx})`;
      })
      .attr("fill", "black");

    var arc = d3.arc();
    svg.attrTween("d", (d) => {
      let endAngle = d.endAngle;
      return (t) => {
        let currentAngle = angleInterpolation(t);
        if (currentAngle < d.startAngle) {
          return "";
        }

        endAngle = Math.min(d.startAngle, endAngle);

        return arc(d);
      };
    });
  }

  handleData();
}

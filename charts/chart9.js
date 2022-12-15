//Wrap your chart in a function with chosen name
export default function stackedBarChart() {
  const margin = { top: 25, right: 25, bottom: 50, left: 50 };

  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select('#stackedBarChart')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);



  const data = [
    { id: 0, ticket: "1st price", ticket_price: 241.5784995 },
    { id: 0, ticket: "2nd price", ticket_price: 44.51326137 },
    { id: 0, ticket: "3rd price", ticket_price: 597.8969281 },
    { id: 0, ticket: "4th price", ticket_price: 921.6133081 },  
    { id: 1, ticket: "1st price", ticket_price: 191.7378698 },
    { id: 1, ticket: "2nd price", ticket_price: 107.2161169 },
    { id: 1, ticket: "3rd price", ticket_price: 217.172682 },
    { id: 1, ticket: "4th price", ticket_price: 239.1096911 }, 
    { id: 3, ticket: "1st price", ticket_price: 872.0751729 },
    { id: 3, ticket: "2nd price", ticket_price: 1238.37686 },
    { id: 3, ticket: "3rd price", ticket_price: 974.841564 },
    { id: 3, ticket: "4th price", ticket_price: 1102.222343 },
    { id: 4, ticket: "1st price", ticket_price: 224.0636077 },  
    { id: 4, ticket: "2nd price", ticket_price: 752.0139711 },
    { id: 4, ticket: "3rd price", ticket_price: 213.2110648 },
    { id: 4, ticket: "4th price", ticket_price: 1054.390961 },
    { id: 5, ticket: "1st price", ticket_price: 381.9099413 },  
    { id: 5, ticket: "2nd price", ticket_price: 82.35291443 },
    { id: 5, ticket: "3rd price", ticket_price: 122.0707327 },
    { id: 5, ticket: "4th price", ticket_price: 527.5333062 },  
    { id: 6, ticket: "1st price", ticket_price: 937.1872723 },  
    { id: 6, ticket: "2nd price", ticket_price: 139.3744058 },
    { id: 6, ticket: "3rd price", ticket_price: 1247.688683 },
    { id: 6, ticket: "4th price", ticket_price: 1155.532907 },
    { id: 8, ticket: "1st price", ticket_price: 224.0636077 },  
    { id: 8, ticket: "2nd price", ticket_price: 752.0139711 },
    { id: 8, ticket: "3rd price", ticket_price: 213.2110648 },
    { id: 8, ticket: "4th price", ticket_price: 1054.390961 },  
    { id: 5, ticket: "1st price", ticket_price: 381.9099413 },  
    { id: 5, ticket: "2nd price", ticket_price: 82.35291443 },
    { id: 5, ticket: "3rd price", ticket_price: 122.0707327 },
    { id: 5, ticket: "4th price", ticket_price: 527.5333062 }, 
    { id: 9, ticket: "1st price", ticket_price: 1157.343199 },  
    { id: 9, ticket: "2nd price", ticket_price: 66.40670324 },
    { id: 9, ticket: "3rd price", ticket_price: 976.8706032 },
    { id: 9, ticket: "4th price", ticket_price: 458.9804824 }, 
    { id: 10, ticket: "1st price", ticket_price: 858.3865607 },   
    { id: 10, ticket: "2nd price", ticket_price: 86.2204185 },
    { id: 10, ticket: "3rd price", ticket_price: 1177.734591 },
    { id: 10, ticket: "4th price", ticket_price: 886.6396047 }, 
    { id: 11, ticket: "1st price", ticket_price: 55.47312759 }, 
    { id: 11, ticket: "2nd price", ticket_price: 333.1879655 },
    { id: 11, ticket: "3rd price", ticket_price: 950.1893459 },
    { id: 11, ticket: "4th price", ticket_price: 266.4905322 }, 
    { id: 12, ticket: "1st price", ticket_price: 3913.4025419 }, 
    { id: 12, ticket: "2nd price", ticket_price: 1185.095657 },
    { id: 12, ticket: "3rd price", ticket_price: 648.5084152 },
    { id: 12, ticket: "4th price", ticket_price: 1056.145517 }, 
  ]

  const keys = ["1st price", "2nd price", "3rd price", "4th price"];
  const id = Array.from(new Set(data.map(d => d.id))).sort(d3.ascending);


  const idToTypeToCount = d3.rollup(
    data,
    g => g[0].ticket_price,
    d => d.id,
    d => d.ticket
  );

  const countsByid = Array.from(idToTypeToCount, ([id, counts]) => {
    counts.set("id", id);
    counts.set("total", d3.sum(counts.values()));
    return Object.fromEntries(counts);
  });

  const stackedData = d3.stack()
      .keys(keys)
      .value((d, key) => d[key] ?? 0)
      (countsByid);

  const x = d3.scaleBand()
      .domain(id)
      .range([0, width])
      .padding(0.25);

  const y = d3.scaleLinear()
      .domain([0, d3.max(countsByid, d => d.total)])
      .range([height, 0]);

  const color = d3.scaleOrdinal()
      .domain(keys)
      .range(["var(--main)","var(--light)","var(--secondary)","var(--accent)"]);

  const xAxis = d3.axisBottom(x);

  svg.append('g')
  .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)

  const yAxis = d3.axisLeft(y);

  svg.append('g')
  .attr('class', 'axis')
      .call(yAxis);

  const groups = svg.append('g')
    .selectAll('g')
    .data(stackedData)
    .join('g')
      .attr('fill', d => color(d.key));

  groups.selectAll('rect')
    .data(d => d)
    .join('rect')
      .attr('x', d => x(d.data.id))
      .attr('y', d => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', d => y(d[0]) - y(d[1]));


svg.append("circle").attr("cx",25).attr("cy",25).attr("r", 6).style("fill", "var(--main)")
svg.append("circle").attr("cx",50).attr("cy",50).attr("r", 6).style("fill", "var(--light)")
svg.append("circle").attr("cx",75).attr("cy",75).attr("r", 6).style("fill", "var(--secondary)")
svg.append("circle").attr("cx",100).attr("cy",100).attr("r", 6).style("fill", "var(--accent)")
svg.append("text").attr("x", 35).attr("y", 25).text("Ticket 1").style("font-size", "15px").attr("alignment-baseline","top")
svg.append("text").attr("x", 60).attr("y", 50).text("Ticket 2").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 85).attr("y", 75).text("Ticket 3").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 110).attr("y", 100).text("Ticket 4").style("font-size", "15px").attr("alignment-baseline","middle")
 
}

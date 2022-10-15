let dataVisualization = {
    title: "Data Visualization",
    description: "Data visualization is essential for analyzing data and making decisions based on it. Below are a few of the standards we have set for visual storytelling.",
    html: "",
    htmlSource: "./htmlComponents/dataVisualization.html",
  };
  
  fetch(dataVisualization.htmlSource)
    .then((response) => response.text())
    .then((text) => (dataVisualization.html = text));
  
  export default dataVisualization;
  
let colors = {
  title: "Color",
  description: "",
  html: "",
  htmlSource: "./htmlComponents/colors.html",
};

fetch(colors.htmlSource)
  .then((response) => response.text())
  .then((text) => (colors.html = text));

export default colors;

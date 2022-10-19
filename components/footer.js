let footer = {
    title: 'Footer',
    description: "Section at the bottom of the page with more information and contact details. Just add updated links to the instances of a href for functionality.",
    html: "",
    htmlSource: "./htmlComponents/footer.html",
    };

fetch(footer.htmlSource)
.then((response) => response.text())
.then((text) => (footer.html = text));
  
export default footer;
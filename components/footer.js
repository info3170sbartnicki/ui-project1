let footer = {
    title: 'Footer',
    description: "Section at the bottom of the page with more information and contact details.",
    html: "",
    htmlSource: "./htmlComponents/footer.html",
    };

fetch(footer.htmlSource)
.then((response) => response.text())
.then((text) => (footer.html = text));
  
export default footer;
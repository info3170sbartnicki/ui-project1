let pageLayout = {
    title: 'pageLayout',
    description: "Overall layout of the website.",
    html: "",
    htmlSource: "./htmlComponents/pageLayout.html",
    };

fetch(pageLayout.htmlSource)
.then((response) => response.text())
.then((text) => (pageLayout.html = text));
  
export default pageLayout;
let pageLayout = {
  title: 'pageLayout',
  description: "Overview of the general dashboard layout for web and mobile, as well as chart layouts for web and mobile.",
  html: "",
  htmlSource: "./htmlComponents/pageLayout.html",
  };

fetch(pageLayout.htmlSource)
.then((response) => response.text())
.then((text) => (pageLayout.html = text));

export default pageLayout;
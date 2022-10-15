let breadcrumbs = {
    title: 'Breadcrumbs',
    description: "Indicates the user's progress through the pages in the site.",
    html: "",
    htmlSource: "./htmlComponents/breadcrumbs.html",
    };

fetch(breadcrumbs.htmlSource)
.then((response) => response.text())
.then((text) => (breadcrumbs.html = text));
  
export default breadcrumbs;
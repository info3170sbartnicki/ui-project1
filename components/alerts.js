let alerts = {
  title: "Alerts",
  description: "Content change detection and notification service.",
  html: "",
  htmlSource: "./htmlComponents/alerts.html",
};

fetch(alerts.htmlSource)
  .then((response) => response.text())
  .then((text) => (alerts.html = text));

export default alerts;

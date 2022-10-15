let typography = {
  title: 'typography',
  description: 'Meet FenixWing fonts:',
  html: '',
  htmlSource: './htmlComponents/typography.html',
};

fetch(typography.htmlSource)
  .then((response) => response.text())
  .then((text) => (typography.html = text));

export default typography;

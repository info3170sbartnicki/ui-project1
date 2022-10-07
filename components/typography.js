let typography = {
  title: 'typography',
  description:
    'Used to display provided data in tile-like layout, pefect for items requiring photo, title and description. Also provides an easy way to add action button.',
  html: '',
  htmlSource: './htmlComponents/typograhy.html',
};

fetch(typography.htmlSource)
  .then((response) => response.text())
  .then((text) => (typography.html = text));

export default typography;

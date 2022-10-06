let grid = {
  title: 'Grid',
  description: 'Grid description',
  html: '',
  htmlSource: './htmlComponents/grid.html',
};

fetch(grid.htmlSource)
  .then((response) => response.text())
  .then((text) => (grid.html = text));

export default grid;

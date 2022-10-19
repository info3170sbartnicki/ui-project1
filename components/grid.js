let grid = {
  title: 'Grid',
  description: 'The grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive. Below is an example and an in-depth look at how the grid comes together.',
  html: '',
  htmlSource: './htmlComponents/grid.html',
};

fetch(grid.htmlSource)
  .then((response) => response.text())
  .then((text) => (grid.html = text));

export default grid;

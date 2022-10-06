//First, we're importing all our components
import card from './components/card.js';
import button from './components/button.js';
import alerts from './components/alerts.js';
import breadcrumbs from './components/breadcrumbs.js';
import grid from './components/grid.js';

let componentBox = document.getElementById('componentBox'); // Inside of it we'll display current component
let components = [alerts, breadcrumbs, button, card, grid]; // Array of our components, please import yours and then add here
let compList = document.getElementById('componentList').children; // Array of <li> elements under 'Components'

Array.from(compList).forEach((item, index) => {
  item.addEventListener('click', () => {
    componentBox.innerHTML = `
    <h1>${components[index].title}</h1>
    <hr>
    <p>${components[index].description}</p>
    ${components[index].html}
    `;
  });
});

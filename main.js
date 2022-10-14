//First, we're importing all our components
import card from './components/card.js';
import button from './components/button.js';
import alerts from './components/alerts.js';
import breadcrumbs from './components/breadcrumbs.js';
import footer from './components/footer.js';
import grid from './components/grid.js';
import navBar from './components/navBar.js';
import pageLayout from './components/pageLayout.js';
import colors from './components/colors.js';
import typography from './components/typography.js';
import icons from './components/icons.js';
import forms from './components/forms.js';

let componentBox = document.getElementById('componentBox'); // Inside of it we'll display current component
let components = [
  typography,
  colors,
  pageLayout,
  alerts,
  breadcrumbs,
  footer,
  button,
  card,
  forms,
  grid,
  icons,
  navBar,
]; // Array of our components, please import yours and then add here
let getStartedList = document.getElementById('getStarted').children; // Array of <li> elements under 'Get Started'
let compList = document.getElementById('componentList').children; // Array of <li> elements under 'Components'
let listTotal = [...getStartedList, ...compList]; // Combined Get started list and components list

listTotal.forEach((item, index) => {
  item.addEventListener('click', () => {
    componentBox.innerHTML = `
    <h1>${components[index].title}</h1>
    <hr>
    <p>${components[index].description}</p>
    ${components[index].html}
    `;
    hljs.highlightAll(); // highlighting html markup
  });
});

//First, we're importing all our components
import card from './components/card.js';
import buttons from './components/buttons.js';
import alerts from './components/alerts.js';
import breadcrumbs from './components/breadcrumbs.js';
import grid from './components/grid.js';
import navBar from './components/navBar.js';
import pageLayouts from './components/pageLayouts.js';
import colors from './components/colors.js';
import typography from './components/typography.js';
import icons from './components/icons.js';
import forms from './components/forms.js';
import footer from './components/footer.js';
import dataVisualization from './components/dataVisualization.js';

import areaChart from './charts/areaChart.js';
import histogram from './charts/histogramChart3.js';
import gaugeChart from './charts/gaugeChart.js';
//import arcChart from './charts/arcChart.js';
import radialChart from './charts/radial.js';

let componentBox = document.getElementById('componentBox'); // Inside of it we'll display current component
let components = [
  typography,
  colors,
  dataVisualization,
  pageLayouts,
  alerts,
  breadcrumbs,
  buttons,
  card,
  footer,
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

// PROJECT 2 SETUP
// You only need to do 3 things here to make your chart work
// 1. Import your chart at the top of the file
// 2. Add a name of chart wrapper to chartWrappers array (it will create div with such ID)
// 3. Call the function that draws your chart.
let dashboard = document.querySelector('#dashboard');
let chartsWrappers = ['area_chart', 'histogram', 'gauge-chart', 'radial-chart']; //add the name of your chart container to this array

dashboard.addEventListener('click', () => {
  componentBox.innerHTML = ``;
  //creating wrapper div for each chart
  chartsWrappers.forEach((chart) => {
    let wrapper = document.createElement('div');
    wrapper.id = chart;
    componentBox.appendChild(wrapper);
  });

  //call your chart function here
  areaChart();
  histogram();
  gaugeChart();
  radialChart();
});

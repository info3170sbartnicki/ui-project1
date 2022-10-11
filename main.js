//First, we're importing all our components
import alerts from "./components/alerts.js";
import colors from "./components/colors.js";

let componentBox = document.getElementById("componentBox"); // Inside of it we'll display current component
let components = [colors, alerts]; // Array of our components, please import yours and then add here
let getStartedList = document.getElementById("getStarted").children; // Array of <li> elements under 'Get Started'
let compList = document.getElementById("componentList").children; // Array of <li> elements under 'Components'
let listTotal = [...getStartedList, ...compList]; // Combined Get started list and components list

listTotal.forEach((item, index) => {
  item.addEventListener("click", () => {
    componentBox.innerHTML = `
    <h1>${components[index].title}</h1>
    <hr>
    <p>${components[index].description}</p>
    ${components[index].html}
    `;
    hljs.highlightAll(); // highlighting html markup
  });
});

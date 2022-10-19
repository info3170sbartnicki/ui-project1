let buttons = {
  title: 'Buttons',
  description: "The library includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.",
  html: '',
  htmlSource: './htmlComponents/buttons.html',
};

fetch(buttons.htmlSource)
    .then((response) => response.text())
    .then((text) => (buttons.html = text));

export default buttons;

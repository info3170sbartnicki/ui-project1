let buttons = {
  title: 'Buttons',
  description: "Button's description",
  html: '',
  htmlSource: './htmlComponents/buttons.html',
};

fetch(buttons.htmlSource)
    .then((response) => response.text())
    .then((text) => (buttons.html = text));

export default buttons;

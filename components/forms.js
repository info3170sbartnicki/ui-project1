let component = {
  title: 'Forms',
  description: 'Forms description',
  html: '',
  htmlSource: './htmlComponents/forms.html',
};

fetch(component.htmlSource)
  .then((response) => response.text())
  .then((text) => (component.html = text));

export default component;

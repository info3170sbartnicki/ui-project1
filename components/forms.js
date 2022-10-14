let component = {
  title: 'Forms',
  description: 'Nice forms, eh?',
  html: '',
  htmlSource: './htmlComponents/forms.html',
};

fetch(component.htmlSource)
  .then((response) => response.text())
  .then((text) => (component.html = text));

export default component;

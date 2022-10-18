let component = {
  title: 'Forms',
  description: 'The form is required to receive information from site visitors. The web form collects user data such as name, email address and message.',
  html: '',
  htmlSource: './htmlComponents/forms.html',
};

fetch(component.htmlSource)
  .then((response) => response.text())
  .then((text) => (component.html = text));

export default component;

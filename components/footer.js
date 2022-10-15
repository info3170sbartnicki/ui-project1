let component = {
  title: 'Footer',
  description: 'Footer',
  html: '',
  htmlSource: './htmlComponents/footer.html',
};

fetch(component.htmlSource)
  .then((response) => response.text())
  .then((text) => (component.html = text));

export default component;

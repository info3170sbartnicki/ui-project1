let navBar = {
  title: 'Nav Bar',
  description:
    'FenixWing navbar, with menu on right or left. It\'s easily reversible by adding class <span class="gold">.reversed</span> to header element.',
  html: '',
  htmlSource: './htmlComponents/navbar.html',
};

fetch(navBar.htmlSource)
  .then((response) => response.text())
  .then((text) => (navBar.html = text));

export default navBar;

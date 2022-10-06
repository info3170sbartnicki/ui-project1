let card = {
  title: 'Card',
  description:
    'Used to display provided data in tile-like layout, pefect for items requiring photo, title and description. Also provides an easy way to add action button.',
  html: '',
  htmlSource: './htmlComponents/card.html',
};

fetch(card.htmlSource)
  .then((response) => response.text())
  .then((text) => (card.html = text));

export default card;

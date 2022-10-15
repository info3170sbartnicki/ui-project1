let component = {
  title: 'Icons',
  description: `Our icons are simple to use. All you need is &lt;i>&lt;/i> tag and couple of classes. For desired size 
          add classes <span class="gold">.ficon-small</span>/<span class="gold">.ficon-medium</span>/<span class="gold">.ficon-large</span>. Also available
          in FenixWing brand colors, just add classes <span class="gold">.gold</span> or <span class="gold">.purple</span>.`,
  html: '',
  htmlSource: './htmlComponents/icons.html',
};

fetch(component.htmlSource)
  .then((response) => response.text())
  .then((text) => (component.html = text));

// My messy code for displaying code of an icon after clicking it.
let iconsButton = document.querySelector('#componentList li:nth-of-type(8)');
iconsButton.addEventListener('click', () => {
  setTimeout(iconClicks, 50);
  function iconClicks() {
    let iconBoxes = document.querySelectorAll('.iconBox');
    iconBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        let codeBox = document.getElementsByClassName('language-html');
        codeBox[0].innerHTML = `\t${escapeHTML(box.childNodes[1].outerHTML)}`;
        hljs.highlightAll();
      });
    });
  }
});

function escapeHTML(input) {
  let escaped = input.replace(new RegExp('>', 'g'), '&gt;');
  return escaped.replace(new RegExp('<', 'g'), '&lt;');
}

export default component;

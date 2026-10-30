const articles = [...document.querySelectorAll('.page-catalog main > article')];
const groups = [
  { name: 'Збірка', services: [0, 1] },
  { name: 'Світчі', services: [2, 3, 4] },
  { name: 'Модифікація', services: [5, 6, 7] },
];

function createCatalogMenu() {
  const menu = document.createElement('nav');
  menu.className = 'catalog-menu';
  menu.setAttribute('aria-label', 'Категорії сервісів');

  const list = document.createElement('ul');
  groups.forEach((group, groupIndex) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const submenu = document.createElement('ul');
    const submenuId = `catalog-submenu-${groupIndex + 1}`;

    button.type = 'button';
    button.textContent = group.name;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', submenuId);

    submenu.id = submenuId;
    submenu.className = 'submenu';
    submenu.hidden = true;

    group.services.forEach((serviceIndex) => {
      const article = articles[serviceIndex];
      if (!article) return;

      const heading = article.querySelector('h3');
      const linkItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${article.id}`;
      link.textContent = heading.textContent.replace(/^\s*\d+\.\s*/, '');
      linkItem.appendChild(link);
      submenu.appendChild(linkItem);
    });

    item.append(button, submenu);
    list.appendChild(item);
  });

  menu.appendChild(list);
  document.querySelector('.page-catalog main > h2').after(menu);

  menu.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const item = button.parentElement;
    const submenu = item.querySelector('.submenu');
    const willOpen = submenu.hidden;

    menu.querySelectorAll('.submenu').forEach((otherSubmenu) => {
      otherSubmenu.hidden = true;
      otherSubmenu.parentElement.classList.remove('open');
      otherSubmenu.parentElement.querySelector('button').setAttribute('aria-expanded', 'false');
    });

    submenu.hidden = !willOpen;
    item.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });

  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openButton = menu.querySelector('button[aria-expanded="true"]');
    if (!openButton) return;
    openButton.click();
    openButton.focus();
  });
}

function createFlipCards() {
  articles.forEach((article, index) => {
    const image = article.querySelector('img');
    const conditions = article.querySelector('ul');
    const heading = article.querySelector('h3');
    if (!image || !conditions || !heading) return;

    article.id = `service-${index + 1}`;

    const card = document.createElement('div');
    const inner = document.createElement('div');
    const back = document.createElement('div');
    const backTitle = document.createElement('h4');

    card.className = 'flip-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', `${heading.textContent}. Показати умови`);
    inner.className = 'flip-card-inner';
    image.classList.add('flip-front');
    image.removeAttribute('tabindex');
    back.className = 'flip-back';
    backTitle.textContent = 'Умови та уточнення';

    back.append(backTitle, conditions);
    inner.append(image, back);
    card.appendChild(inner);
    heading.after(card);

    card.addEventListener('click', () => {
      const isFlipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(isFlipped));
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      card.click();
    });
  });
}

createFlipCards();
createCatalogMenu();

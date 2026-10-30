const header = document.querySelector('.site-header');
const title = header.querySelector('.site-title');
const pics = ['barebone.jpg', 'custom.jpg', 'linear.webp', 'tactile.webp', 'clicky.jpg', 'foam.webp', 'solder.jpg', 'stabilise.avif'];

if (getComputedStyle(header).position === 'static') header.style.position = 'relative';

// 1. Предмети, що з'являються та зникають на фоні шапки
function capHeight() {
  const s = getComputedStyle(title);
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
  return ctx.measureText('К').actualBoundingBoxAscent || parseFloat(s.fontSize) * 0.7;
}

function showItem() {
  const h = capHeight() * 2 * (1.2 + Math.random() * 0.6); // вища за подвоєну висоту великої літери
  const w = h * 1.5;
  const img = new Image();
  img.src = 'images/' + pics[Math.floor(Math.random() * pics.length)];
  img.alt = '';
  img.className = 'float-item';
  img.style.height = h + 'px';
  img.style.width = w + 'px';
  img.style.top = Math.random() * Math.max(0, header.clientHeight - h) + 'px';
  img.style.left = Math.random() * Math.max(0, header.clientWidth - w) + 'px';
  header.appendChild(img);
  setTimeout(() => img.classList.add('visible'), 50);
  setTimeout(() => img.classList.remove('visible'), 2500);
  setTimeout(() => img.remove(), 3300);
}

document.fonts.ready.then(() => {
  showItem();
  setInterval(showItem, 1200);
});

// 5. Меню: вертикально праворуч до 768 px, інакше горизонтально зверху
const mq = matchMedia('(max-width: 768px)');
function setNav() {
  header.classList.toggle('nav-side', mq.matches);
  header.classList.toggle('nav-top', !mq.matches);
}
setNav();
mq.addEventListener('change', setNav);
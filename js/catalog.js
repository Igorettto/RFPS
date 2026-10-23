const units = { 'год': 1, 'дн': 24 };
const fields = ['id', 'name', 'type', 'day1', 'day2', 'duration', 'unit', 'price'];
const hours = s => s.duration * units[s.unit];

const services = [
  { id: 10, name: 'Діагностика плати', type: 'Діагностика', day1: 40, day2: 55, duration: 2, unit: 'год', price: 150 },
  { id: 8, name: 'Тюнінг стабілізаторів', type: 'Модифікація', day1: 32, day2: 41, duration: 1, unit: 'дн', price: 350 },
  { id: 1, name: 'Barebone-складання клавіатури', type: 'Збірка', day1: 58, day2: 64, duration: 2, unit: 'дн', price: 400 },
  { id: 3, name: 'Змащування лінійних світчів', type: 'Світчі', day1: 71, day2: 83, duration: 1, unit: 'дн', price: 500 },
  { id: 7, name: 'Пайка плати та hot-swap', type: 'Модифікація', day1: 45, day2: 52, duration: 3, unit: 'дн', price: 550 },
  { id: 4, name: 'Змащування тактильних світчів', type: 'Світчі', day1: 49, day2: 57, duration: 2, unit: 'дн', price: 600 },
  { id: 5, name: 'Змащування кліккі світчів', type: 'Світчі', day1: 37, day2: 44, duration: 2, unit: 'дн', price: 600 },
  { id: 9, name: 'Заміна пружин у світчах', type: 'Світчі', day1: 28, day2: 35, duration: 1, unit: 'дн', price: 650 },
  { id: 6, name: 'Шумоізоляція корпусу', type: 'Модифікація', day1: 63, day2: 77, duration: 3, unit: 'дн', price: 700 },
  { id: 2, name: 'Повна кастомна збірка', type: 'Збірка', day1: 92, day2: 120, duration: 5, unit: 'дн', price: 1500 },
];

const out = document.querySelector('main').appendChild(document.createElement('pre'));
function print(title, lines) {
  out.textContent += title + '\n' + lines.join('\n') + '\n\n';
}

function average(list, key) {
  let sum = 0;
  list.forEach(x => sum += x[key]);
  return (sum / list.length).toFixed(1);
}

// 1. Впорядкування за терміном і середні значення для однакових термінів
const sorted = services.concat().sort((a, b) => hours(a) - hours(b));
print('Сервіси за терміном виконання:', sorted.map(s => `${s.name} — ${s.duration} ${s.unit}`));

const shown = [];
const averages = [];
sorted.forEach(s => {
  if (shown.indexOf(hours(s)) !== -1) return;
  shown.push(hours(s));
  const same = sorted.filter(x => hours(x) === hours(s));
  averages.push(`${s.duration} ${s.unit}: доба_1 — ${average(same, 'day1')}, доба_2 — ${average(same, 'day2')}`);
});
print('Середня кількість читачів за термінами:', averages);

// 2. Максимум читачів за добу_2
const maxDay2 = Math.max(...services.map(s => s.day2));
const topService = services.filter(s => s.day2 === maxDay2)[0];
print('Максимум читачів за добу_2:', [`${topService.name}, тип: ${topService.type}`]);

// 3. Додавання запису
function addService(s) {
  let i = services.length;
  if (fields.every(f => s[f] !== undefined)) {
    i = 0;
    while (i < services.length && services[i].price <= s.price) i++;
  }
  services.splice(i, 0, s);
}
addService({ id: 11, name: 'Заміна кейкапів', type: 'Діагностика', day1: 30, day2: 38, duration: 3, unit: 'год', price: 450 });
addService({ id: 12, name: 'Консультація', type: 'Консультація', day1: 20, day2: 25, duration: 1, unit: 'год' });
print('Список після додавання:', services.map(s => `${s.id}. ${s.name} — ${s.price}`));

// 4. Тривалість одночасного надання за типом
const types = [];
services.forEach(s => {
  if (types.indexOf(s.type) === -1) types.push(s.type);
});
types.forEach(t => {
  const group = services.filter(s => s.type === t);
  const k = group.length === 1 ? 1 : group.length <= 3 ? 1.1 : 2;
  print(`Одночасно, тип «${t}»:`, group.map(s => `${s.name} — ${Math.round(s.duration * k * 10) / 10} ${s.unit}`));
});
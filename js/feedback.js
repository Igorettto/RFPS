const purposes = { cooperation: 'Співпраця', complaint: 'Скарга', suggestion: 'Пропозиція', error: 'Помилка' };
const groups = ['активна молодь', 'похилий претензійний', 'середній без претензій', 'інші'];

class User {
  constructor(surname, name, age, email, purpose, date) {
    this.surname = surname;
    this.name = name;
    this.age = age;
    this.email = email;
    this.purpose = purpose;
    this.date = date; // Date: дата та час звернення
  }

  getGroup() {
    if (this.age < 25 && this.purpose === 'suggestion') return groups[0];
    if (this.age > 60 && this.purpose === 'complaint') return groups[1];
    if (this.age > 25 && this.age < 60 && this.purpose !== 'complaint') return groups[2];
    return groups[3];
  }

  toString() {
    return `${this.surname} ${this.name}, ${this.age} р., ${this.email}, ${this.date.toLocaleString('uk-UA')}`;
  }
}

class UserList {
  constructor(users) {
    this.users = users;
  }

  // Звернення протягом місяця заданого моменту — до цього моменту включно
  inMonthUntil(moment) {
    return this.users.filter(u => u.date.getFullYear() === moment.getFullYear()
      && u.date.getMonth() === moment.getMonth() && u.date <= moment);
  }

  youngest() {
    const min = Math.min(...this.users.map(u => u.age));
    return this.users.filter(u => u.age === min)[0];
  }

  countByGroup() {
    return groups.map(g => `${g}: ${this.users.filter(u => u.getGroup() === g).length}`);
  }

  sortedByEmail() {
    return this.users.concat().sort((a, b) => a.email > b.email ? 1 : -1);
  }
}

const list = new UserList([
  new User('Шевченко', 'Олена', 22, 'olena.shevchenko@ukr.net', 'suggestion', new Date(2026, 9, 5, 10, 15)),
  new User('Коваль', 'Петро', 67, 'petro.koval@gmail.com', 'complaint', new Date(2026, 9, 12, 14, 30)),
  new User('Мельник', 'Іван', 35, 'ivan.melnyk@mail.com', 'cooperation', new Date(2026, 9, 14, 9, 0)),
  new User('Бондар', 'Марія', 41, 'maria.bondar@gmail.com', 'error', new Date(2026, 9, 20, 16, 45)),
  new User('Ткаченко', 'Сергій', 19, 'serhii.tkachenko@ukr.net', 'complaint', new Date(2026, 8, 28, 11, 20)),
  new User('Кравчук', 'Ольга', 63, 'olha.kravchuk@gmail.com', 'suggestion', new Date(2026, 9, 2, 13, 10)),
  new User('Олійник', 'Андрій', 28, 'andrii.oliinyk@mail.com', 'suggestion', new Date(2026, 8, 15, 18, 5)),
  new User('Лисенко', 'Тетяна', 55, 'tetiana.lysenko@gmail.com', 'complaint', new Date(2026, 9, 18, 8, 50)),
  new User('Гончар', 'Максим', 24, 'maksym.honchar@ukr.net', 'suggestion', new Date(2026, 9, 21, 20, 0)),
  new User('Савченко', 'Віктор', 72, 'viktor.savchenko@gmail.com', 'complaint', new Date(2026, 9, 22, 12, 0)),
]);

const out = document.querySelector('main').appendChild(document.createElement('pre'));
function print(title, lines) {
  out.textContent += title + '\n' + lines.join('\n') + '\n\n';
}

const moment = new Date(2026, 9, 15, 12, 0);
print(`Звернення в місяці заданого моменту до ${moment.toLocaleString('uk-UA')}:`, list.inMonthUntil(moment).map(String));

const y = list.youngest();
print('Наймолодший користувач:', [`${y.age} р., ${y.email}, звернення: ${y.date.toLocaleDateString('uk-UA')}`]);

print('Кількість за класами:', list.countByGroup());

print('За E-mail (за алфавітом):', list.sortedByEmail().map(u => `${u.email} — ${purposes[u.purpose]}`));
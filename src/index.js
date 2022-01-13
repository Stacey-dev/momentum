const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
userName.setAttribute('placeholder', '[Enter name]');

let lang = 'en';

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  realTime = setTimeout(showTime, 1000);
  time.textContent = `${currentTime}`;
  showDate();
  showGreeting();
};

let realTime = setTimeout(showTime, 1000);

const showDate = () => {
  const weekdayName = {
    ru: [
      'Воскресенье',
      'Понедельние',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  };
  const realDate = new Date();
  const numberDay = realDate.getDay();
  const options = {
    month: 'long',
    day: 'numeric',
  };
  const currentDate = realDate.toLocaleDateString(
    lang === 'en' ? 'en-US' : 'ru-RU',
    options
  );
  date.innerText = `${weekdayName[lang][numberDay]}, ${currentDate}`;
};

const getTimeOfDay = () => {
  let timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  let count = Math.floor(hours / 6);
  return timeOfDay[count];
};

const getTimeOfDayGreeting = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = {
    ru: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
    en: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
  };

  let count = Math.floor(hours / 6);
  return timeOfDay[lang][count];
};

const showGreeting = () => {
  const timeOfDay = getTimeOfDayGreeting();
  greeting.innerText = `${timeOfDay}, `;
};

const setLocalStorage = () => {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
};

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
};

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

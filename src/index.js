const prevSlideBtn = document.querySelector('.slide-prev');
const nextSlideBtn = document.querySelector('.slide-next');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
userName.setAttribute('placeholder', '[Enter name]');
const quoteContainer = document.querySelector('.quote');
const authorContainer = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windInfo = document.querySelector('.wind');
const humidityInfo = document.querySelector('.humidity');
const feelsLikeInfo = document.querySelector('.feels-like');
const city = document.querySelector('.city');
const APIKeyWeather = 'a150fbd01bc7aecac3637e5f13b26333';

let lang = 'en';
let randomNum;

const translationInfo = {
  ru: {
    placeholderName: 'Введите имя',
    placeholderCity: city.value,
    // date: 'ru-RU',
    weather: 'ru',
  },
  en: {
    placeholderName: 'Enter name',
    placeholderCity: city.value,
    weather: 'en',
  },
};

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

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const setBg = () => {
  const timeOfDay = getTimeOfDay();
  let bgNum = getRandomNum(1, 20);
  if (bgNum < 10) {
    bgNum = '0' + bgNum;
  }
  const img = new Image();
  let src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };
};

setBg();

const getSlideNext = () => {
  randomNum = getRandomNum(1, 20) + 1;
  if (randomNum === 20) {
    randomNum = 1;
  }
  setBg();
};

const getSlidePrev = () => {
  if (githubImageBtn.classList.contains('active')) {
    randomNum = getRandomNum(1, 20) - 1;
    if (randomNum === 1) {
      randomNum = 20;
    }
    setBg();
  } else if (unsplashImageBtn.classList.contains('active')) {
    getLinkToImage();
  }
};

nextSlideBtn.addEventListener('click', getSlideNext);
prevSlideBtn.addEventListener('click', getSlidePrev);

async function getQuotes() {
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = getRandomNum(0, 12);
  quoteContainer.textContent = data[randomQuote][lang].text;
  authorContainer.textContent = data[randomQuote][lang].author;
}

document.addEventListener('DOMContentLoaded', getQuotes);
changeQuoteBtn.addEventListener('click', getQuotes);

async function getWeather() {
  if (!city.value) {
    city.value = localStorage.getItem('city');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${APIKeyWeather}&units=metric&lang=${lang}`;

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    weatherError.innerText = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    console.log(data.weather[0].id);
    temperature.innerText = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.innerText = data.weather[0].description;
    windInfo.innerText = `${
      weatherTranslation[lang].wind
    }: ${data.wind.speed.toFixed(0)} ${weatherTranslation[lang].speedUnit}`;
    humidityInfo.innerText = `${
      weatherTranslation[lang].humidity
    }: ${data.main.humidity.toFixed(0)}%`;
    feelsLikeInfo.innerText = `${
      weatherTranslation[lang].feelsLike
    }: ${data.main.feels_like.toFixed(0)}°C`;
  } else {
    weatherError.innerText = `${weatherTranslation[lang].errorText}`;
    weatherIcon.className = 'weather-icon owf';
    temperature.innerText = '';
    weatherDescription.innerText = '';
    windInfo.innerText = '';
    humidityInfo.innerText = '';
    feelsLikeInfo.innerText = '';
  }
}

const weatherTranslation = {
  ru: {
    wind: 'Скорость ветра',
    speedUnit: 'м/с',
    humidity: 'Влажность воздуха',
    feelsLike: 'Ощущается',
    errorText: 'Введите правильно город',
  },
  en: {
    wind: 'Wind speed',
    speedUnit: 'm/s',
    humidity: 'Humidity',
    feelsLike: 'Feels like',
    errorText: 'Enter correct city name',
  },
};

const setCity = (event) => {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
};

getWeather();

city.addEventListener('keypress', setCity);

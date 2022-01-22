import playList from './js/playList';

const audio = new Audio();
const playListContainer = document.querySelector('.play-list');
const playBtn = document.querySelector('.play');
const prevPlayBtn = document.querySelector('.play-prev');
const nextPlayBtn = document.querySelector('.play-next');
const prevSlideBtn = document.querySelector('.slide-prev');
const nextSlideBtn = document.querySelector('.slide-next');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
// userName.setAttribute('placeholder', '[Enter name]');
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
const settingsBtn = document.querySelector('.settings-btn');
const settingsWrapper = document.querySelector('.settings__wrapper');
const langEn = document.querySelector('.lang-en');
const langRu = document.querySelector('.lang-ru');
const githubImageBtn = document.querySelector('.github');
const unsplashImageBtn = document.querySelector('.unsplash');
const APIKeyUnsplash = 'Teq0MD93_YbobK6rwYGdMY3lLqI-RqGdBO1BR-y_43o';

let lang = 'en';
let randomNum;
let playNum = 0;
let isPlay = false;

const translationInfo = {
  ru: {
    placeholderName: 'Введите имя',
    placeholderCity: 'Введите город',
    weather: 'ru',
  },
  en: {
    placeholderName: 'Enter name',
    placeholderCity: 'Enter city',
    weather: 'en',
  },
};

const showSettingsMenu = () => {
  settingsBtn.classList.toggle('active');
  settingsWrapper.classList.toggle('active');
};

settingsBtn.addEventListener('click', showSettingsMenu);

const placeholderText = () => {
  city.value = translationInfo[lang].placeholderCity;
  userName.placeholder = translationInfo[lang].placeholderName;
};

placeholderText();

const changeLanguageEn = () => {
  if (langRu.classList.contains('active')) {
    langRu.classList.remove('active');
    langEn.classList.add('active');
    lang = 'en';
  }
  showDate();
  getWeather();
  getQuotes();
  placeholderText();
};

const changeLanguageRu = () => {
  if (langEn.classList.contains('active')) {
    langRu.classList.add('active');
    langEn.classList.remove('active');
    lang = 'ru';
  }
  showDate();
  getWeather();
  getQuotes();
  placeholderText();
};

langEn.addEventListener('click', changeLanguageEn);
langRu.addEventListener('click', changeLanguageRu);

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
  if (githubImageBtn.classList.contains('active')) {
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
  }
};

setBg();

const getSlideNext = () => {
  if (githubImageBtn.classList.contains('active')) {
    randomNum = getRandomNum(1, 20) + 1;
    if (randomNum === 20) {
      randomNum = 1;
    }
    setBg();
  } else if (unsplashImageBtn.classList.contains('active')) {
    getLinkToImage();
  }
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

async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${APIKeyUnsplash}`;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    const img = new Image();
    let src = data.urls.regular;
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  }
}

githubImageBtn.addEventListener('click', setBg);
githubImageBtn.addEventListener('click', () => {
  githubImageBtn.classList.add('active');
  unsplashImageBtn.classList.remove('active');
});

unsplashImageBtn.addEventListener('click', getLinkToImage);
unsplashImageBtn.addEventListener('click', () => {
  githubImageBtn.classList.remove('active');
  unsplashImageBtn.classList.add('active');
});

const playAudio = () => {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.volume = 0.5;
  if (!isPlay) {
    isPlay = true;
    audio.play();
  } else {
    isPlay = false;
    audio.pause();
  }
};

const toggleBtn = () => {
  playBtn.classList.toggle('pause');
  playAudio();
};

const playNext = () => {
  if (playNum === playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }

  isPlay = false;
  playAudio();
  playBtn.classList.add('pause');
};

const playPrev = () => {
  if (playNum <= 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }

  isPlay = false;
  playAudio();
  playBtn.classList.add('pause');
};

playBtn.addEventListener('click', toggleBtn);
nextPlayBtn.addEventListener('click', playNext);
prevPlayBtn.addEventListener('click', playPrev);

const createPlayList = () => {
  playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', createPlayList);

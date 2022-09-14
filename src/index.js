import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('input#search-box');
const countryListEl = document.querySelector('country-list');
const countryInfoEl = document.querySelector('country-info');

//? Поле поиска
inputSearch.addEventListener(
  'input',
  //? Задержка в 300мс
  debounce(event => {
    event.preventDefault();

    //? Инпут
    const searchingLetters = event.target.value.trim();
    console.log(searchingLetters);

    //? Импорт фетча
    fetchCountries(searchingLetters)
      .then(data => {
        if (data.length === 0) {
          clearCountries(makeCountryList, makeCountryInfo);
          return;
        } else if (data.length === 1) {
          makeCountryList(data);
        }
      })
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

//! Ф-я очистки полей стран
function clearCountries(x, y) {
  x.innerHTML = '';
  y.innerHTML = '';
}

//! Ф-я создания разметки
function makeCountryList(countries) {
  const countryList = countries.map(country => {
    return `<li class="country-list__item">
  <img src="${country.flags.png}" width="100" />
  <p class="country-list__name">${country.name.official}</p>
</li>`;
  });
  for (const country of countryList) {
    countryListEl.insertAdjacentHTML('afterbegin', country);
  }
}

//! Ф-я создания разметки для стран
function makeCountryInfo(countries) {
  const country = countries[0];
  const aboutCountry = `<div class="country-info__box" alt="flag">
            <img src=${country.flags.png} width="50">
            <span class="country-info__name">${country.name.official}</span>
            </div>
            <p class="country-text"><span class="country-info--accent">Capital:</span> ${
              country.capital
            }</p>
            <p class="country-text"><span class="country-info--accent">Population:</span> ${
              country.population
            }</p>
            <p class="country-text"><span class="country-info--accent">Languages:</span> ${Object.values(
              country.languages
            ).join(', ')}</p>`;

  countryInfoElem.insertAdjacentHTML('afterbegin', aboutCountry);
}

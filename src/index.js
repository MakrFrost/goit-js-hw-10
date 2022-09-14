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
    fetchCountries(searchingLetters).then(data => {
      makeCountryList(data);
    });
  }, DEBOUNCE_DELAY)
);

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

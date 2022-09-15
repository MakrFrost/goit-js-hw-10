import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

//? Поле поиска
inputSearch.addEventListener(
  'input',
  //? Задержка в 300мс
  debounce(e => {
    //? Инпут
    let searchingLetters = inputSearch.value.trim();

    if (searchingLetters.length === 0) {
      clearCountries(countryInfoEl, countryListEl);
      return;
    }

    //? Импорт фетча
    fetchCountries(searchingLetters)
      .then(data => {
        if (data.length === 1) {
          Notiflix.Notify.info(`We found entered country! ${searchingLetters}`);
          clearCountries(countryInfoEl, countryListEl);
          makeCountryInfo(data);
        } else if (data.length > 1 && data.length <= 9) {
          Notiflix.Notify.info('We found too much countries!');
          clearCountries(countryInfoEl, countryListEl);
          makeCountryList(data);
        } else {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          clearCountries(countryInfoEl, countryListEl);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearCountries(countryInfoEl, countryListEl);
      });
  }, DEBOUNCE_DELAY)
);

//! Ф-я очистки полей стран
function clearCountries(x, y) {
  x.innerHTML = '';
  y.innerHTML = '';
}

//! Ф-я создания разметки для стран
function makeCountryInfo(countries) {
  const country = countries[0];
  const aboutCountry = `<div alt="flag">
            <img src=${country.flags.svg} width="100">
            <span>${country.name.official}</span>
            </div>
            <p><span>Capital:</span> ${country.capital}</p>
            <p><span>Population:</span> ${country.population}</p>
            <p><span>Languages:</span> ${Object.values(country.languages).join(
              ', '
            )}</p>`;

  countryInfoEl.insertAdjacentHTML('beforeend', aboutCountry);
  console.log('выполнилась функция makeCountryInfo для страны');
}

//! Ф-я создания разметки
function makeCountryList(countries) {
  const countryList = countries.map(country => {
    return `<li class="country-list__item">
            <img src=${country.flags.png} width="80" alt="flag">
            <span>${country.name.official}</span>
        </li>`;
  });
  countryList.forEach(markupCountry => {
    countryListEl.insertAdjacentHTML('beforeend', markupCountry);
    console.log('выполнилась функция makeCountryList для стран');
  });
}

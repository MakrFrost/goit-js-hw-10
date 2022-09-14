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
    let searchingLetters = inputSearch.value.trim();
    console.log(searchingLetters);

    if (searchingLetters === '') {
      clearCountries();
      return;
    }

    //? Импорт фетча
    fetchCountries(searchingLetters)
      .then(data => {
        console.log(data);
        if (data.length === 1) {
          Notiflix.Notify.success(
            `We found entered country! ${searchingLetters}`
          );
          clearCountries();
          makeCountryInfo(data);
        } else if (data.length > 1 && data.length <= 8) {
          Notiflix.Notify.info('We found too much counties');
          makeCountryList(data);
        } else {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        error,
          Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);

//! Ф-я очистки полей стран
function clearCountries() {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
}

//! Ф-я создания разметки для стран
function makeCountryInfo(countries) {
  const country = countries[0];
  const aboutCountry = `<div class="country-info__box" alt="flag">
            <img src=${country.flags.png} width="80">
            <span class="country-info__name">${country.name.official}</span>
            </div>
            <p class="country-text"><span class="country-info--accent">Capital:</span> ${country.capital}</p>
            <p class="country-text"><span class="country-info--accent">Population:</span> ${country.population}</p>
            <p class="country-text"><span class="country-info--accent">Languages:</span>${country.languages}</p>`.join(
    ', '
  );

  countryInfoEl.insertAdjacentHTML('afterbegin', aboutCountry);
  console.log('выполнилась функция makeCountryInfo');
}

//! Ф-я создания разметки
function makeCountryList(countries) {
  const countryList = countries.map(country => {
    return `<li class="country-list__item">
  <img src="${country.flags.png}" width="100" />
  <p class="country-list__name">${country.name.official}</p>
</li>`;
  });
  countryList.forEach(countryEl => {
    countryListEl.insertAdjacentHTML('afterbegin', countryEl);
  });
  console.log('выполнилась функция makeCountryList');
}

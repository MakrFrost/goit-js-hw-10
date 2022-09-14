import './css/styles.css';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('input#search-box');
const countryListEl = document.querySelector('country-list');
const countryInfoEl = document.querySelector('country-info');

inputSearch.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const searchingLetters = event.target.value;
    console.log(searchingLetters);
    // fetchCountries(`${searchingLetters}`);
    makeCountryList(fetchCountries(`${searchingLetters}`));
  }, DEBOUNCE_DELAY)
);

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

// function makeMarkupList(countries) {
//   const countriesList = countries.map(country => {
//     return `<li class="country-list__item">
//             <img src=${country.flags.png} width="50" alt="flag">
//             <span class="country-list__name">${country.name.official}</span>
//         </li>`;
//   });
//   countriesList.forEach(markupCountry => {
//     countriesListElem.insertAdjacentHTML('beforeend', markupCountry);
//   });
// }

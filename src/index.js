import './css/styles.css';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('input#search-box');
inputSearch.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const searchingLetters = event.target.value;
    fetchCountries(`${searchingLetters}`);
  }, DEBOUNCE_DELAY)
);

function fetchCountries(nameCountry) {
  // const url = 'https://restcountries.com/v3.1/name/';
  // const options = '?fields=name,capital,population,flags,languages';

  fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    // fetch(`${url}${nameCountry}${options}`).then(response => {
    //restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages

    https: if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };

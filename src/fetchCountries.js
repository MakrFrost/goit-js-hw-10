function fetchCountries(nameCountry) {
  // const url = 'https://restcountries.com/v3.1/name/';
  // const options = '?fields=name,capital,population,flags,languages';

  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };

// fetch(`${url}${nameCountry}${options}`).then(response => {
//https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages

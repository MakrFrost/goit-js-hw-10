function fetchCountries(nameCountry) {
  const url = 'https://restcountries.com/v3.1/name/';

  const options = '?fields=name,capital,population,flags,languages';

  fetch(`${url}${nameCountry}${options}`)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export default { fetchCountries };

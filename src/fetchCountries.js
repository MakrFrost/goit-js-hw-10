function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';

  const options = '?fields=name,capital,population,flags,languages';

  fetch(`${url}${name}${options}`)
    .then(response => {
      return response.json();
    })
    .then(massiveOfCountries => {
      return [massiveOfCountries];
    });
}

export default fetchCountries;

// if (!response.ok) {
//   throw new Error(response.status);
// }

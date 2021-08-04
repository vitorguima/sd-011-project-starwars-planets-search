export default function getPlanetsApi(saveData) {
  const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  fetch(API_URL)
    .then((results) => results.json())
    .then((data) => saveData(data.results))
    .catch((error) => new Error(error));
}

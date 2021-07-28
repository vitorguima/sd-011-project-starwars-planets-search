function fetchApi() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  return fetch(url)
    .then((response) => response.json())
    .then(({ results }) => results);
}

export default fetchApi;

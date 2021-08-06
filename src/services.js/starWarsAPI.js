function starWarsAPI() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((result) => result.json())
    .then((resolve) => resolve.results);
}
export default starWarsAPI;

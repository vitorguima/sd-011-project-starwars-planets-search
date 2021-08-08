function starWarsAPI() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((result) => result.json())
    .then(({ results }) => {
      results.forEach((planet) => {
        delete planet.residents;
      });
      return results;
    });
}
export default starWarsAPI;

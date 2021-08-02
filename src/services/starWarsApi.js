const api = 'https://swapi-trybe.herokuapp.com/api/planets/';

/* const starWarsApi = () => (
  fetch(api)
    .then((response) => (
      response.json()
        .then((data) => (data.results
        ))))); */

async function starWarsApi() {
  try {
    const results = await fetch(api);
    const data = await results.json();
    const clear = data.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    return clear;
  } catch (error) {
    return error.message;
  }
}

export default starWarsApi;

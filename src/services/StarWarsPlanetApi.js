const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchPlanetsApi() {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const deleteResidents = data.results.map((item) => {
      delete item.residents;
      return item;
    });
    return deleteResidents;
  } catch (error) {
    return error.message;
  }
}

export default fetchPlanetsApi;

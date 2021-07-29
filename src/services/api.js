const API = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchPlanets() {
  try {
    const request = await fetch(API);
    const response = await request.json();
    return response.results;
  } catch (error) {
    return error;
  }
}

export default fetchPlanets;

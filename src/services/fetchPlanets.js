const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchPlanets() {
  try {
    const response = await fetch(API_URL);
    const { results } = await response.json();
    const planets = results;

    return planets;
  } catch (error) {
    console.log(error.message);
  }
}
export default fetchPlanets;

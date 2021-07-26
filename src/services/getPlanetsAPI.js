const STARWARS_API_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function getPlanetsAPI() {
  const response = await fetch(STARWARS_API_PLANETS);
  const planets = await response.json();
  return planets.results;
}

export default getPlanetsAPI;

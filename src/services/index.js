export const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

export async function getThePlanets() {
  const response = await fetch(endpoint);
  const { results } = await response.json();
  console.log(results);
  return results;
}

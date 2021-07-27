const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function fetchAllPlanetsInAPI() {
  const response = fetch(API_URL);
  const data = (await response).json();
  const { results } = data;
  return results;
}

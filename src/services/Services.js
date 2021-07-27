export default async function fetchPlanets() {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
}

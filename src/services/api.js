export default async function getPlanets() {
  const fetchAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const planets = fetchAPI.json();
  return planets;
}

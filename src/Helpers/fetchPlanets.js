export default function fetchPlanets() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((planets) => planets.results);
}

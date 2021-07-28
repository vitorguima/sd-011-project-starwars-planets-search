export default function fetchApi() {
  const planets = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json());
  return planets;
}

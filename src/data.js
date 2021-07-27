export default function getPlanets() {
  const planets = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((r) => r.json());
  return planets;
}

export default function fetchPlanetsAPI(setData) {
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((response) => setData(response.results));
}

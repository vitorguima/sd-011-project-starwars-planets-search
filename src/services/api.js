const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

export default async function fetchPlanets() {
  const response = await fetch(ENDPOINT);
  const resp = await response.json();
  const respResults = resp.results;
  // console.log(respResults);
  const respWithOutResidents = respResults.filter(
    (planet) => ((planet.residents) ? delete planet.residents : planet),
  );
  // console.log(respWithOutResidents);
  return respWithOutResidents;
}

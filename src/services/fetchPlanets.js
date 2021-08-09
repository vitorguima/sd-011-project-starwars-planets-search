const planetsURL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function fetchPlanets() {
  const { results } = await fetch(planetsURL).then((data) => data.json());
  return results;
}

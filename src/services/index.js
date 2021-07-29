const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

export default async function FetchPlanets() {
  const { results } = await fetch(URL).then((data) => data.json());
  return results;
}

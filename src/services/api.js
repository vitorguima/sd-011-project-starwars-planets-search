const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function planets() {
  const response = fetch(ENDPOINT);
  const responseJSON = await response.json().results;
  const data = responseJSON.map((planet) => delete planet.residents);
  return data;
}

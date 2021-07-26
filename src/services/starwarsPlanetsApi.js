const apiEndpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function getPlanetList() {
  const fetchAPI = await fetch(apiEndpoint);
  const response = await fetchAPI.json();
  const { results } = response;
  return results;
}

export default getPlanetList;

async function requestStarWarsApi() {
  const link = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const primeResponse = await fetch(link);
  const twoResponse = await primeResponse.json();
  return twoResponse;
}

export default requestStarWarsApi;

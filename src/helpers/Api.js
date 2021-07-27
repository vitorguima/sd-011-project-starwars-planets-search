async function Api() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const ApiResolved = await fetch(url)
    .then((response) => response.json());
  ApiResolved.results.map((planet) => delete planet.residents);
  return ApiResolved.results;
}

export default Api;

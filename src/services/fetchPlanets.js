const getPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const r = await response.json();
  const results = r.results.filter((planet) => delete planet.residents);
  // console.log(results);
  return results;
}; // Função que captura os dados da API sem a chave residents.

export default getPlanets;

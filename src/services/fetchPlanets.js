const getPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  const results = data.results.filter((planet) => delete planet.residents);
  // console.log(results);
  return results;
}; // Função que captura o header da tabela sem a chave residents.

export default getPlanets;

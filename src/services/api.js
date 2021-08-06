const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const requestPlanets = async () => {
  const apiAwait = await fetch(URL_API);
  const responseAwait = await apiAwait.json();
  const result = responseAwait.results;
  // Delete keys of a given object
  result.forEach((element) => delete element.residents);
  return result;
};

export default requestPlanets;

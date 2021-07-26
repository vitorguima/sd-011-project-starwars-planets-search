async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endpoint);
  const { results } = await response.json();
  // Ref: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
  results.forEach((result) => delete result.residents);
  return results;
}

export default fetchPlanets;

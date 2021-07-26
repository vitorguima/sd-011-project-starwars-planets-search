async function fetchAPI() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  return json.results;
}

export default fetchAPI;

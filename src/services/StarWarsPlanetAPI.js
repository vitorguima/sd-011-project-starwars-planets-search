export async function fetchPlanets() {
  const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const response = result.json();
  console.log(response);
  return response;
}

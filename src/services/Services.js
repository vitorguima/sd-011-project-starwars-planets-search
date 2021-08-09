export async function fetchPlanets() {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPoint);
  const { results } = await response.json();
  return results;
}

export function changeAnything() {
  console.log('outra funcao exportada');
}

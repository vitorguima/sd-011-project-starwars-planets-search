const fetchApiStarWarsPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  const { results } = await (response.ok ? Promise.resolve(json)
    : Promise.reject(json));
  return results;
};

export default fetchApiStarWarsPlanets;

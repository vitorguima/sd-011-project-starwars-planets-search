const fetchPlanets = async () => {
  const planets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await planets.json();
  return results;
};

export default fetchPlanets;

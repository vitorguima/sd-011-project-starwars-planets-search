const fetchPlanet = async () => {
  const respone = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const result = await respone.json();
  return result.results;
};

export default fetchPlanet;

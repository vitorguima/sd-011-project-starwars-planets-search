const planetsAPI = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const planets = await response.json();
  planets.results.forEach((result) => delete result.residents);
  return planets;
};

export default planetsAPI;

const getPlanets = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const planetsJSON = await fetch(URL);
  const data = planetsJSON.json();
  return data;
};

export default getPlanets;

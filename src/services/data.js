const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const planetsData = await fetch(URL);
  return planetsData.json();
}

export default getPlanets;

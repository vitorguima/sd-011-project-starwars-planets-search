const planetsAPI = async () => {
  const resultAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await resultAPI.json();
  return results;
};

export default planetsAPI;

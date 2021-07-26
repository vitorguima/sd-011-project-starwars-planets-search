const getPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endpoint);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default getPlanets;

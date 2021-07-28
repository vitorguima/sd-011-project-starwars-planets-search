const getPlanets = async () => {
  const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const reqJSON = endpoint.json();
  return reqJSON;
};

export default getPlanets;

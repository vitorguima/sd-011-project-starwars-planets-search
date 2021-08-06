const Planets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const resp = await fetch(url);
  const result = await resp.json();
  return result;
};

export default Planets;

const getAPI = async () => {
  const API = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const APIjson = await API.json();
  return APIjson.results.filter((result) => delete result.residents);
};

export default getAPI;

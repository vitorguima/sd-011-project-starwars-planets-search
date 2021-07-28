const getAPI = async () => {
  const API = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const APIjson = await API.json();
  console.log(APIjson);
  return APIjson.results.filter((result) => delete result.residents);
};

export default getAPI;

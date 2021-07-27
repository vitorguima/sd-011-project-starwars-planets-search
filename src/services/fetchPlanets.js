const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fecthApi = async () => {
  const requestApi = await fetch(API_URL);
  const requestJson = await requestApi.json();
  return requestJson;
};

export default fecthApi;

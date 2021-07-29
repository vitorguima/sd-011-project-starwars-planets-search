async function requestData() {
  const planetsApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const response = await planetsApi.json();
  return response;
}

export default requestData;

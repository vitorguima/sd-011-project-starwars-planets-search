const FetchAPI = async () => {
  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
};

export default FetchAPI;

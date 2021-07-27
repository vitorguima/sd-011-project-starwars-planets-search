const API = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  const result = json.results;
  return result;
  // console.log(Object.keys(test.results[0]));
};

export default API;

const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fecthApi = async () => {
  const result = await fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export default fecthApi;

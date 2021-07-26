const getAPI = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(URL);
  const json = await response.json();
  const { results } = json;
  await results.forEach((planet) => delete planet.residents);
  try {
    return results;
  } catch (error) {
    return error;
  }
};

export default getAPI;

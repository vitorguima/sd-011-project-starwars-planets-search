const fetchStarwarsAPI = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint).then((data) => data.json());
  results.filter((item) => delete item.residents);
  return results;
};

export default fetchStarwarsAPI;

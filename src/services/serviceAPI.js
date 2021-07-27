const fetchPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json());
  const filtered = response.results;
  filtered.filter((planet) => delete planet.residents);
  return filtered;
};

export default fetchPlanets;

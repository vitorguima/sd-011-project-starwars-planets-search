const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchStarWarsPlanets = async () => {
  const response = await fetch(STAR_WARS_API);
  const { results } = await response.json();
  return results;
};

export default fetchStarWarsPlanets;

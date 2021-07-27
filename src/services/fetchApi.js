const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApi = () => fetch(API_URL)
  .then((response) => response.json())
  .then(({ results }) => {
    results.forEach((planet) => delete planet.residents);

    return results;
  });

export default fetchApi;

// export const category = [
//   'Climate',
//   'Created',
//   'Diameter',
//   'Edited',
//   'Films',
//   'Gravity',
//   'Name',
//   'Orbital Period',
//   'Population',
//   'Rotation Period',
//   'Surface Water',
//   'Terrain',
//   'URL',
// ];

// export const dropDrawComparation = [
//   'population',
//   'orbital_period',
//   'diameter',
//   'rotation_period',
//   'surface_water',
// ];

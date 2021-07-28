import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function Table() {
  const { data, filters } = useContext(MyContext);
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;

  const searchFilters = !name ? data : data.filter((dataFiltered) => dataFiltered.name
    .toLowerCase().includes(name.toLocaleLowerCase()));

  // para esta etapa consultei o repositorio de Alberto Cândido
  // Fonte: https://github.com/tryber/sd-011-project-starwars-planets-search/pull/90/files
  const compareColums = () => {
    const newSearch = searchFilters.filter((planetFilter) => {
      let beTrueOrFalse = true;
      filterByNumericValues.forEach(({ comparison, value, column }) => {
        switch (comparison) {
        case 'maior que':
          beTrueOrFalse = beTrueOrFalse && Number(planetFilter[column]) > Number(value);
          break;
        case 'menor que':
          beTrueOrFalse = beTrueOrFalse && Number(planetFilter[column]) < Number(value);
          break;
        case 'igual a':
          beTrueOrFalse = beTrueOrFalse && Number(planetFilter[column]) === Number(value);
          break;
        default:
          beTrueOrFalse = false;
          break;
        }
      });
      return beTrueOrFalse;
    });
    return newSearch;
  };

  return (
    <table>
      <thead>
        <tr>
          <th> name</th>
          <th> rotation_period</th>
          <th> orbital_period</th>
          <th> diameter</th>
          <th> climate</th>
          <th> gravity</th>
          <th> terrain</th>
          <th>surface_water:</th>
          <th> population</th>
          <th> films</th>
          <th> created</th>
          <th> edited</th>
          <th> url</th>
        </tr>
      </thead>
      <tbody>
        {compareColums().map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

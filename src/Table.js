import React, { useContext } from 'react';
import MyContext from './context/MyContext';

function Table() {
  const { data, filters } = useContext(MyContext);
  const { filterByName } = filters;
  const { name } = filterByName;

  const searchFilters = !name ? data : data.filter((dataFiltered) => dataFiltered.name
    .toLowerCase().includes(name.toLocaleLowerCase()));

  return (
    <table>
      <thead>
        <tr>
          <th> name:</th>
          <th> rotation_period:</th>
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
        {searchFilters.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

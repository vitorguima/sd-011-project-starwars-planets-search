import React, { useContext } from 'react';
import FilteredContext from '../context/FilteredContext';

function Table() {
  const { planets, filters, setFilters } = useContext(FilteredContext);
  const planetsFiltereds = filters.filterByName.name.toLowerCase();

  // Lógica do input desenvolvida com a ajuda do
  // Henrique Pozzolini - Turma 11
  // Lógica do filter desenvolvida com a ajuda do
  // Henrique Pozzolini - Turma 11 e da Gabriela Feijó - Turma 11

  return (
    <>
      <input
        data-testid="name-filter"
        onChange={ (e) => setFilters({ ...filters,
          filterByName: {
            name: e.target.value,
          },
        }) }
      />
      <table>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
        <tbody>
          { planets.filter((p) => p.name.toLowerCase().includes(planetsFiltereds))
            .map((planet) => (
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
              </tr>)) }
        </tbody>
      </table>
    </>
  );
}

export default Table;

import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Table() {
  const { data, fetchApi } = useContext(GlobalContext);
  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const filterPlanets = data && data.results
    .filter((value) => value.name.includes(filter.filters.filterByName.name));

  function renderTHEAD() {
    return (
      <thead>
        <tr>
          <th>climate</th>
          <th>created</th>
          <th>diameter</th>
          <th>edited</th>
          <th>films</th>
          <th>gravity</th>
          <th>name</th>
          <th>orbital_period</th>
          <th>population</th>
          <th>rotation_period</th>
          <th>surface_water</th>
          <th>terrain</th>
          <th>url</th>
        </tr>
      </thead>
    );
  }

  function renderFilters() {
    return (
      <div>
        <select data-testid="column-filter">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period </option>
          <option value="surface_water">surface_water</option>
        </select>
        <select data-testid="comparison-filter">
          <option value=">">maior que</option>
          <option value="<">menor que</option>
          <option value="===">igual a</option>
        </select>
        <input type="number" name="number" data-testid="value-filter" />
        <button type="button" data-testid="button-filter">Filtrar</button>
      </div>
    );
  }

  if (!data) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <label htmlFor="planet">
        Digite o planeta:
        <input
          type="text"
          name="planet"
          data-testid="name-filter"
          onChange={ ({ target }) => setFilter({
            filters: {
              filterByName: {
                name: target.value,
              },
            },
          }) }
        />
      </label>
      <br />
      {renderFilters()}
      <table>
        {renderTHEAD()}
        <tbody>
          {filterPlanets.map((planet, i) => (
            <tr key={ i }>
              <td>{planet.climate}</td>
              <td>{planet.created}</td>
              <td>{planet.diameter}</td>
              <td>{planet.edited}</td>
              <td>{planet.films}</td>
              <td>{planet.gravity}</td>
              <td>{planet.name}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.terrain}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

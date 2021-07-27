import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Table() {
  const { data, fetchApi } = useContext(GlobalContext);
  useEffect(() => {
    fetchApi();
  }, []);

  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const [filterOption, setFilterOption] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [filteredPlanets, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(data && data.results
      .filter((value) => value.name.includes(filter.filters.filterByName.name)));
  }, [data, filter.filters.filterByName]);

  function filterPlanets() {
    return setFiltered(data && data.results.filter((value) => {
      switch (filterOption.comparison) {
      case 'maior que':
        return Number(value[filterOption.column]) > Number(filterOption.value);
      case 'menor que':
        return Number(value[filterOption.column]) < Number(filterOption.value);
      case 'igual a':
        return Number(value[filterOption.column]) === Number(filterOption.value);
      default:
        return true;
      }
    }));
  }

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
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setFilterOption({
            ...filterOption, column: target.value,
          }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setFilterOption({
            ...filterOption, comparison: target.value,
          }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            onChange={ ({ target }) => setFilterOption({
              ...filterOption, value: target.value,
            }) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterPlanets }
        >
          Filtrar
        </button>
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
          {filteredPlanets && filteredPlanets.map((planet, i) => (
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

import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const [filterState, setFilterState] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  const { data, filterByNumericValues } = useContext(StarContext);
  const [state, setState] = useState({ column: '', comparison: '', valor: '' });

  const handleChange = ({ name, value }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const { column, comparison, valor } = state;
  const filteredPlanets = data.filter((planet) => planet.name
    .includes(filterState.filters.filterByName.name));
  return (
    <div>
      <label htmlFor="filterPlanets">
        <input
          id="filterPlanets"
          data-testid="name-filter"
          onChange={ (({ target }) => setFilterState({
            ...filterState,
            filters: {
              filterByName: {
                name: target.value,
              },
            },
          })) }
        />
      </label>
      <select
        onChange={ ({ target }) => handleChange(target) }
        name="column"
        data-testid="column-filter"
      >
        <option defaultValue="selected">Selecione uma Opção</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ ({ target }) => handleChange(target) }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option defaultValue="selected">Selecione uma Opção</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ ({ target }) => handleChange(target) }
        name="valor"
        data-testid="value-filter"
        type="number"
        placeholder="Valor"
      />
      <button
        onClick={ () => {
          filterByNumericValues(column, comparison, valor);
        } }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
        </thead>
        <tbody>
          { filteredPlanets.map((planet, index) => (
            <tr key={ index }>
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
    </div>
  );
}

export default Table;

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
  const [state, setState] = useState({
    column: '',
    comparison: '',
    valor: '',
    columnsData: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  });

  const handleChange = ({ name, value }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const removeColumn = (column) => {
    const { columnsData } = state;
    const updateColumns = columnsData;
    updateColumns.forEach((columnName, index) => {
      if (columnName === column) {
        updateColumns.splice(index, 1);
      }
    });

    setState({
      ...state,
      columnsData: updateColumns,
    });
  };

  const { column, comparison, valor, columnsData } = state;

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
        { columnsData.map((columnName, index) => (
          <option
            key={ index }
            value={ columnName }
          >
            {columnName}
          </option>
        ))}
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
          removeColumn(column);
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

import React from 'react';
import Context from '../Context/Context';

function Table() {
  const resultsApi = React.useContext(Context);
  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });
  const [filterNumericValues, setFilterNumericValues] = React.useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const [allPlanets, setAllPlanets] = React.useState([]);

  React.useEffect(() => {
    if (resultsApi.data) {
      setAllPlanets(resultsApi.data.results
        .filter((value) => value.name.includes(filters.filters.filterByName.name)));
    }
  }, [resultsApi.data, filters]);

  if (!resultsApi.data) {
    return (
      <p>carregando</p>
    );
  }

  const filterTR = Object.keys(resultsApi.data.results[0])
    .filter((value) => value !== 'residents');

  function handlerClick({ target }) {
    const { value } = target;
    setFilters({
      filters: {
        filterByName: {
          name: value,
        },
        filterByNumericValues: [
          ...filters.filters.filterByNumericValues,
        ],
      },
    });
  }

  const filterPlanets = allPlanets.filter((value) => {
    switch (filterNumericValues.comparison) {
    case 'maior que':
      return value[filterNumericValues.column] > Number(filterNumericValues.value);
    case 'menor que':
      return value[filterNumericValues.column] < Number(filterNumericValues.value);
    case 'igual a':
      return value[filterNumericValues.column] === filterNumericValues.value;
    default:
      return true;
    }
  });

  const filterColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((value) => {
    const { filterByNumericValues } = filters.filters;
    return !filterByNumericValues.some(({ column }) => column === value);
  });

  function setStateFilters() {
    const { column, comparison, value } = filterNumericValues;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [...filters.filters.filterByNumericValues, { column, comparison, value }] } });
  }

  return (
    <div>
      <label htmlFor="filter">
        <input
          data-testid="name-filter"
          name="filter"
          type="text"
          onChange={ (value) => handlerClick(value) }
        />
      </label>
      <label htmlFor="value">
        <input
          name="value"
          data-testid="value-filter"
          value={ filters.filters.filterByNumericValues.value }
          type="number"
          onChange={ ({ target }) => {
            setFilterNumericValues({

              ...filterNumericValues,
              value: target.value,
            });
          } }
        />
      </label>
      <label htmlFor="column">
        <select
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => {
            setFilterNumericValues({

              ...filterNumericValues,
              column: target.value,
            });
          } }

        >
          {filterColumn
            .map((item, index) => (<option key={ index } value={ item }>{item}</option>))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setFilterNumericValues({

              ...filterNumericValues,
              comparison: target.value,
            });
          } }
        >
          <option>Selecione</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <button
        data-testid="button-filter"
        onClick={ setStateFilters }
        type="button"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {filterTR.map((item, index) => (<th key={ index }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((item, index) => (
            <tr key={ index }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

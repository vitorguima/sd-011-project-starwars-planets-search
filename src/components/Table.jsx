import React from 'react';
import Context from '../Context/Context';
import Filter from './Filter';
import Select from './Select';

function Table() {
  const resultsApi = React.useContext(Context);
  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: '',
        sort: '',
      },
    },
  });
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [sort, setSort] = React.useState({ order: {
    column: 'name',
    sort: 'ASC',
  } });

  const [filterNumericValues, setFilterNumericValues] = React.useState({
    column: 'maior que',
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
        ...filters.filters.order,
      },
    });
  }
  const filterPlanets = Filter(filters, allPlanets);
  filterPlanets.sort((planetA, planetB) => {
    const { column } = sort.order;
    if (sort.order.sort === 'ASC' && /^[0-9]/.test(planetA[column])) {
      return +planetA[column] - +planetB[column];
    }
    if (sort.order.sort === 'ASC') {
      return planetA[column].charCodeAt(0) - planetB[column].charCodeAt(0);
    }
    if (sort.order.sort === 'DESC' && /^[0-9]/.test(planetA[column])) {
      return +planetB[column] - +planetA[column];
    }
    return 0;
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
      [...filters.filters.filterByNumericValues, { column, comparison, value }],
      order: {
        ...filters.filters.order,
        sort: sort.order.sort,
        column: sort.order.column,
      },
    } });
  }

  function removeParams(indexComparison) {
    setFilters({ filters: {
      ...filters.filters,
      filterByNumericValues: [
        ...filters.filters.filterByNumericValues
          .filter((value, index) => index !== indexComparison)],
    } });
  }
  const params = { setSort,
    filterTR,
    sort,
    isLoaded,
    setIsLoaded };
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
      { Select(params) }
      <div>
        {filters.filters.filterByNumericValues.map((item, index) => (
          <div data-testid="filter" key={ index }>
            <span>{ `${item.comparison} ${item.value} ${item.column}` }</span>
            <button
              type="button"
              onClick={ () => removeParams(index) }
            >
              x
            </button>
          </div>))}
      </div>
      <table>
        <thead>
          <tr>
            {filterTR.map((item, index) => (<th key={ index }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((item, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{item.name}</td>
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

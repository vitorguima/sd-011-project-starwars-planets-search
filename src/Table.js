import React from 'react';
import { GlobalContext } from './GlobalContext';

const Table = () => {
  const apiResults = React.useContext(GlobalContext);

  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  const [filter, setFilter] = React.useState({
    column: '',
    comparison: '',
    value: '',
  });

  const [filterData, setFilterData] = React.useState([]);

  React.useEffect(() => {
    if (apiResults.data) {
      setFilterData(apiResults.data.results
        .filter((value) => value.name.includes(filters.filters.filterByName.name)));
    }
  }, [apiResults.data, filters]);

  const filterColumn = filterData.filter((value) => {
    const { filterByNumericValues } = filters.filters;
    if (filterByNumericValues.length > 0) {
      const filterValues = filterByNumericValues[filterByNumericValues.length - 1];
      switch (filterValues.comparison) {
      case 'maior que':
        return value[filterValues.column] > Number(filterValues.value);
      case 'menor que':
        return value[filterValues.column] < Number(filterValues.value);
      case 'igual a':
        return value[filterValues.column] === filterValues.value;
      default:
        return true;
      }
    } return true;
  });

  if (!apiResults.data) {
    return (
      <p>Carregando...</p>
    );
  }

  const filterHeader = Object.keys(apiResults.data.results[0])
    .filter((value) => value !== 'residents');

  function handleClickOnState() {
    const { column, comparison, value } = filter;
    setFilters({ filters: { ...filters.filters,
      filterByNumericValues:
      [...filters.filters.filterByNumericValues, { column, comparison, value }] } });
  }

  function handleClickRemoveList(param) {
    setFilters({ filters: {
      ...filters.filters,
      filterByNumericValues: [...filters.filters.filterByNumericValues
        .filter((_value, index) => index !== param)],
    } });
  }

  const columnFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((value) => {
    const { filterByNumericValues } = filters.filters;
    return !filterByNumericValues.some(({ column }) => column === value);
  });

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          name="name-filter"
          value={ filters.filters.filterByName.name }
          type="text"
          onChange={ ({ target }) => {
            setFilters({
              filters: {
                ...filters.filters,
                filterByName: {
                  name: target.value,
                },
              },
            });
          } }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
              column: target.value,
            });
          } }
        >
          { columnFilterOptions
            .map((value, index) => <option key={ index }>{value}</option>) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
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
      <label htmlFor="value">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filter.value }
          onChange={ ({ target }) => {
            setFilter({
              ...filter,
              value: target.value,
            });
          } }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickOnState }
      >
        Filter
      </button>
      <ol>
        { filters.filters.filterByNumericValues
          .map((value, index) => (
            <li data-testid="filter" key={ index }>
              {`${value.column} | ${value.comparison} | ${value.value}`}
              <button
                type="button"
                onClick={ () => handleClickRemoveList(index) }
              >
                x
              </button>
            </li>)) }
      </ol>
      <table>
        <thead>
          <tr>
            { filterHeader.map((value, index) => <th key={ index }>{value}</th>)}
          </tr>
        </thead>
        <tbody>
          { filterColumn.map((value, index) => (
            <tr key={ index }>
              <td>{value.name}</td>
              <td>{value.rotation_period}</td>
              <td>{value.orbital_period}</td>
              <td>{value.diameter}</td>
              <td>{value.climate}</td>
              <td>{value.gravity}</td>
              <td>{value.terrain}</td>
              <td>{value.surface_water}</td>
              <td>{value.population}</td>
              <td>{value.films}</td>
              <td>{value.created}</td>
              <td>{value.edited}</td>
              <td>{value.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

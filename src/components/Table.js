import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const comparisonFilterOptions = ['maior que', 'menor que', 'igual a'];

function filterPlanets(filteredByName, filterByNumericValues) {
  return filteredByName.filter((planet) => {
    if (filterByNumericValues.length > 0) {
      const column = planet[
        filterByNumericValues[filterByNumericValues.length - 1].column];

      const { comparison, value } = filterByNumericValues[
        filterByNumericValues.length - 1
      ];

      switch (comparison) {
      case 'maior que':
        return Number(column) > Number(value);
      case 'menor que':
        return Number(column) < Number(value);
      case 'igual a':
        return Number(value) === Number(column);
      default:
        return true;
      }
    }
    return true;
  });
}

function Table() {
  const { data } = useContext(GlobalContext);
  const [filters, setFilters] = React.useState({
    columnFilter: '',
    comparisonFilter: '',
    inputNumber: '',
  });

  const [order, setOrder] = React.useState({
    sortOrder: '',
    columnOrder: '',
  });

  const [search, setSearch] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });

  function changeState({ target: { value } }) {
    setSearch({
      filters: {
        ...search.filters,
        filterByName: {
          name: value,
        },
      },
    });
  }

  function buttonFilter() {
    const { columnFilter, comparisonFilter, inputNumber } = filters;
    setSearch({
      filters: {
        ...search.filters,
        filterByNumericValues: [
          ...search.filters.filterByNumericValues,
          {
            column: columnFilter,
            comparison: comparisonFilter,
            value: inputNumber,
          },
        ],
      },
    });
  }

  function changeOrder({ target: { name, value } }) {
    setOrder({
      sortOrder: name === 'order' ? value : order.sortOrder,
      columnOrder: name === 'column' ? value : order.columnOrder,
    });
  }

  if (!data) return <p>Loading...</p>;
  const thNames = Object.keys(data[0]).filter((name) => name !== 'residents');
  const filteredByName = data
    .filter((planet) => planet.name.includes(search.filters.filterByName.name));

  const columnFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((option) => {
    const { filterByNumericValues } = search.filters;
    return !filterByNumericValues.some(({ column }) => column === option);
  });

  const { filterByNumericValues } = search.filters;

  return (
    <div>
      <select onChange={ changeOrder } name="column" data-testid="column-sort">
        {thNames.map((name, index) => (
          <option key={ index }>{name}</option>))}
      </select>
      <input
        onChange={ changeOrder }
        type="radio"
        name="order"
        data-testid="column-sort-input-asc"
        value="ASC"
      />
      <input
        onChange={ changeOrder }
        type="radio"
        name="order"
        data-testid="column-sort-input-desc"
        value="DESC"
      />
      <button
        onClick={ () => {
          const { sortOrder, columnOrder } = order;
          setSearch({
            filters: {
              ...search.filters,
              ...filterByNumericValues,
              order: {
                column: columnOrder,
                sort: sortOrder,
              },
            },
          });
        } }
        type="button"
        data-testid="column-sort-button"
      >
        ORDER
      </button>
      <label htmlFor="input">
        <input data-testid="name-filter" id="input" onChange={ changeState } />
      </label>
      <select
        data-testid="column-filter"
        onChange={
          ({ target: { value } }) => setFilters({ ...filters, columnFilter: value })
        }
      >
        {columnFilterOptions.map((optionContent, index) => (
          <option key={ index }>{optionContent}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={
          ({ target: { value } }) => setFilters({ ...filters, comparisonFilter: value })
        }
      >
        {comparisonFilterOptions.map((optionContent, index) => (
          <option key={ index }>{optionContent}</option>))}
      </select>
      <input
        data-testid="value-filter"
        onChange={
          ({ target: { value } }) => setFilters({ ...filters, inputNumber: value })
        }
        type="number"
      />
      <button onClick={ buttonFilter } type="button" data-testid="button-filter">
        Adicionar Filtro
      </button>
      {filterByNumericValues.map(({ column, comparison, value }, index) => (
        <div data-testid="filter" key={ index }>
          <span>{`${column} `}</span>
          <span>{`${comparison} `}</span>
          <span>{`${value}`}</span>
          <button
            type="button"
            onClick={ () => setSearch({
              filters: {
                ...search.filters,
                filterByNumericValues: [
                  ...search.filters.filterByNumericValues.filter(
                    (_value, idx) => idx !== index,
                  ),
                ],
              },
            }) }
          >
            x
          </button>
        </div>))}
      <table>
        <thead>
          <tr>
            {thNames.map((value, index) => (
              <th key={ index }>{value}</th>))}
          </tr>
        </thead>
        <tbody>
          {filterPlanets(filteredByName, search.filters.filterByNumericValues)
            .sort((planetA, planetB) => {
              const { column, sort } = search.filters.order;
              if (sort === 'ASC' && /^[0-9]/.test(planetA[column])) {
                return +planetA[column] - +planetB[column];
              }
              if (sort === 'ASC') {
                return planetA[column].charCodeAt(0) - planetB[column].charCodeAt(0);
              }
              if (sort === 'DESC' && /^[0-9]/.test(planetA[column])) {
                return +planetB[column] - +planetA[column];
              }
              return planetB[column].charCodeAt(0) - planetA[column].charCodeAt(0);
            })
            .map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{planet.name}</td>
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
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;

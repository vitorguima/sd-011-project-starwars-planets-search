import React, { useContext } from 'react';
import Context from '../context/Context';
import TableInfos from './TableInfos';
import { dropdownColumns, dropdownTag } from '../data/data';

function Table() {
  const data = useContext(Context);

  const [dropdownFilter, setDropdownFilter] = React.useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const [filter, setFilter] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  function inputSearch({ target: { value } }) {
    setFilter({
      filters: {
        ...filter.filters,
        filterByName: {
          name: value,
        },
      },
    });
  }

  function changeDropdownFilter({ target: { value, name } }) {
    setDropdownFilter({
      ...dropdownFilter,
      [name]: value,
    });
  }

  function addNewFilter() {
    const { column, comparison, value } = dropdownFilter;
    setFilter({
      filters: {
        ...filter.filters,
        filterByNumericValues: [
          ...filter.filters.filterByNumericValues,
          { column, comparison, value },
        ],
      },
    });
  }

  if (!data) return <p>Loading...</p>;

  const filteredByName = data
    .filter(({ name }) => name.includes(filter.filters.filterByName.name));

  const filteredByDropdown = filteredByName.filter((planet) => {
    const { filterByNumericValues: filters } = filter.filters;

    if (filters.length === 0) return true;

    const actualFilter = filters[filters.length - 1];
    const { column, comparison, value } = actualFilter;

    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(value);
    case 'menor que':
      return Number(planet[column]) < Number(value);
    case 'igual a':
      return Number(planet[column]) === Number(value);
    default:
      return true;
    }
  });

  return (
    <div>
      <select
        onChange={ changeDropdownFilter }
        name="column"
        data-testid="column-filter"
      >
        {dropdownColumns.map((item, index) => (
          <option key={ index }>{item}</option>
        ))}
      </select>

      <select
        onChange={ changeDropdownFilter }
        name="comparison"
        data-testid="comparison-filter"
      >
        {dropdownTag.map((item, index) => (
          <option key={ index }>{item}</option>
        ))}
      </select>

      <input
        onChange={ changeDropdownFilter }
        name="value"
        type="number"
        data-testid="value-filter"
      />

      <button onClick={ addNewFilter } type="button" data-testid="button-filter">
        Filtrar
      </button>

      <input type="text" data-testid="name-filter" onChange={ inputSearch } />

      <TableInfos arrayOfPlanets={ filteredByDropdown } />
    </div>
  );
}

export default Table;

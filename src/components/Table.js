import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import TableInfos from './TableInfos';
import { dropdownColumns, dropdownTag, planetInfos } from '../data/data';

function Table() {
  const data = useContext(GlobalContext);

  const [dropdownFilter, setDropdownFilter] = React.useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const [sort, setSort] = React.useState('ASC');
  const [column, setColumn] = React.useState('name');

  const [filter, setFilter] = React.useState({
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
    const { column: col, comparison, value } = dropdownFilter;
    setFilter({
      filters: {
        ...filter.filters,
        filterByNumericValues: [
          ...filter.filters.filterByNumericValues,
          { col, comparison, value },
        ],
      },
    });
  }

  function removeFilter(index) {
    setFilter({
      filters: {
        ...filter.filters,
        filterByNumericValues: [
          ...filter.filters.filterByNumericValues.filter(
            (_, idx) => index !== idx,
          ),
        ],
      },
    });
  }

  function setOrder() {
    setFilter({
      filters: {
        ...filter.filters,
        order: {
          sort,
          column,
        },
      },
    });
  }

  if (!data) return <p>Loading...</p>;
  const filteredByName = data.filter(({ name }) => name
    .includes(filter.filters.filterByName.name));

  const filteredByDropdown = filteredByName.filter((planet) => {
    const { filterByNumericValues: filters } = filter.filters;

    if (filters.length === 0) return true;

    const actualFilter = filters[filters.length - 1];
    const { col, comparison, value } = actualFilter;

    switch (comparison) {
    case 'maior que':
      return Number(planet[col]) > Number(value);
    case 'menor que':
      return Number(planet[col]) < Number(value);
    case 'igual a':
      return Number(planet[col]) === Number(value);
    default:
      return true;
    }
  });

  const { filterByNumericValues: filters, order } = filter.filters;
  const { column: colmn, sort: sorted } = order;
  const filteredDropdownColumns = dropdownColumns.filter(
    (item) => !filters.some(({ col }) => col === item),
  );

  return (
    <div>
      <select
        onChange={ ({ target: { value } }) => setColumn(value) }
        data-testid="column-sort"
      >
        {['name', ...planetInfos].map((info, index) => (
          <option key={ index }>{info}</option>
        ))}
      </select>

      <label htmlFor="ASC">
        ASC
        <input
          id="ASC"
          data-testid="column-sort-input-asc"
          name="sort"
          type="radio"
          onClick={ () => setSort('ASC') }
        />
      </label>

      <label htmlFor="DESC">
        DESC
        <input
          onChange={ () => setSort('DESC') }
          id="DESC"
          data-testid="column-sort-input-desc"
          name="sort"
          type="radio"
        />
      </label>

      <button onClick={ setOrder } data-testid="column-sort-button" type="button">
        Ordernar
      </button>

      <select
        onChange={ changeDropdownFilter }
        name="column"
        data-testid="column-filter"
      >
        {filteredDropdownColumns.map((item, index) => (
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

      {filters.map((item, index) => (
        <p data-testid="filter" key={ index }>
          <span>{`${item.col} `}</span>
          <span>{`${item.comparison} `}</span>
          <span>{`${item.value} `}</span>
          <button onClick={ () => removeFilter(index) } type="button">
            x
          </button>
        </p>
      ))}

      <TableInfos
        sort={ sorted }
        column={ colmn }
        arrayOfPlanets={ filteredByDropdown }
      />
    </div>
  );
}

export default Table;

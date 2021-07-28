import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Header() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;

  const [column, setColumn] = useState('population');
  const [value, setValue] = useState('');
  const [comparison, setComparison] = useState('maior que');

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  }

  const columnBase = [
    'population',
    'diameter',
    'orbital_period',
    'rotation_period',
    'surface_water',
  ];

  const columnFilter = columnBase.filter((item) => !filterByNumericValues
    .map((element) => element.column).includes(item));

  return (
    <div>
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setFilters(
            { ...filters, filterByName: { name: target.value } },
          ) }
          type="text"
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        { columnFilter.map((element, index) => (
          <option key={ index }>{ element }</option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option name="maior que">maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick() }
      >
        Pesquisar
      </button>
    </div>
  );
}

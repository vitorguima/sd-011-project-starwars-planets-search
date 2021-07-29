import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Form() {
  const {
    setFilters,
    filters,
    button,
    setColumn,
    setValue,
    setComparisonFilter } = useContext(MyContext);
  /* console.log(planetsFilter); */

  const dropdownFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparationFilter = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target }) => {
          setFilters({ ...filters, filterByName: { name: target.value } });
        } }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => {
          setColumn(target.value);
        } }
      >
        { dropdownFilter.map((value, index) => (
          <option key={ index }>{value}</option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => {
          setComparisonFilter(target.value);
        } }
      >
        { comparationFilter.map((val, idx) => (
          <option key={ idx }>{val}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button data-testid="button-filter" type="button" onClick={ button }>Filter</button>
    </div>
  );
}

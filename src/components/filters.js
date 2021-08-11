import React, { useContext, useState } from 'react';
import AppContext from '../context/context';

function Filter() {
  const {
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    resetFilter } = useContext(AppContext);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const comparationOptions = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        { column, comparison, value: valueFilter }] });
    const nextOptions = columnOptions.filter((option) => option !== column);
    setColumnOptions(nextOptions);
  };

  const renderOptions = (options) => (
    options.map((filter) => <option key={ filter } value={ filter }>{filter}</option>)
  );

  const newFilter = (currentColumn) => {
    const result = filters.filterByNumericValues
      .filter((filter) => filter.column !== currentColumn);
    resetFilter(result);
  };

  const revertButton = () => (

    filters.filterByNumericValues.map((filter) => (
      <p key={ filter.column } data-testid="filter">
        <button
          type="button"
          onClick={ () => newFilter(filter.column) }
        >
          X
        </button>
      </p>
    ))
  );

  return (
    <div>
      <label htmlFor="name-filter">
        Search Planet:
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <select data-testid="column-filter" onChange={ (e) => setColumn(e.target.value) }>
        {renderOptions(columnOptions)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        {renderOptions(comparationOptions)}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      { revertButton() }
    </div>
  );
}

export default Filter;

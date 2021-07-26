import React, { useContext } from 'react';
import Context from '../context/Context';

export default function NumericFilters() {
  const {
    allFilters,
    usedFilters,
    handleNumericFilter,
    setUpdateFilter,
    filters: {
      filterByNumericValues,
    },
    removeFilter,
  } = useContext(Context);

  const filters = allFilters.filter((filter) => !usedFilters.includes(filter));

  return (
    <>
      {
        filterByNumericValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
            <button
              type="button"
              onClick={ () => removeFilter(index) }
            >
              X
            </button>
          </div>
        ))
      }
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => handleNumericFilter(e.target) }
      >
        { filters.map((actualFilter, i) => (
          <option key={ i } value={ actualFilter }>{actualFilter}</option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (e) => handleNumericFilter(e.target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        onChange={ (e) => handleNumericFilter(e.target) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => setUpdateFilter(true) }
      >
        Filtrar
      </button>
    </>
  );
}

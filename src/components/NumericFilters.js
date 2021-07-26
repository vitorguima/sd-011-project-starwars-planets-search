import React, { useContext } from 'react';
import Context from '../context/Context';

export default function NumericFilters() {
  const {
    allFilters,
    usedFilters,
    handleNumericFilter,
    setUpdateFilter,
  } = useContext(Context);

  const filters = allFilters.filter((filter) => !usedFilters.includes(filter));

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => handleNumericFilter(e.target) }
      >
        { filters.map((filter, index) => (
          <option key={ index } value={ filter }>{filter}</option>
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

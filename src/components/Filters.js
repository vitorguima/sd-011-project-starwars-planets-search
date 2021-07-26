import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

function Filters() {
  const global = useContext(GlobalContext);
  const { setFilterInputs, FilterInputs } = global;

  return (
    <>
      <select
        onChange={ ({ target: { value } }) => setFilterInputs({
          ...FilterInputs, column: value }) }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        onChange={ ({ target: { value } }) => setFilterInputs({
          ...FilterInputs, comparison: value }) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        onChange={ ({ target: { value } }) => setFilterInputs({
          ...FilterInputs, value }) }
        type="number"
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        // onClick={ () => handleFilter() }
      >
        Aplicar Filtro
      </button>
    </>
  );
}

export default Filters;

import React, { useContext } from 'react';
import AppContext from './Context';

function SelectedFilter() {
  const { handleClickSelect, filterSelect,
    handleClickComparison, filterComparation } = useContext(AppContext);
  return (
    <div>
      <select
        data-testid="column-filter"
        value={ filterSelect }
        onChange={ handleClickSelect }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ filterComparation }
        onChange={ handleClickComparison }
      >
        <option>menor que</option>
        <option>maior que</option>
        <option>igual a</option>
      </select>
    </div>
  );
}

export default SelectedFilter;

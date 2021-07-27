import React, { useContext } from 'react';
import AppContext from './Context';

function SelectedFilter() {
  const { handleClickSelect, filterSelect,
    handleClickComparison, filterComparation, listaColunas } = useContext(AppContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ filterSelect }
        onChange={ handleClickSelect }
      >
        { !listaColunas.find(
          (item) => item === 'population',
        ) && <option>population</option> }
        { !listaColunas.find(
          (item) => item === 'orbital_period',
        ) && <option>orbital_period</option> }
        { !listaColunas.find(
          (item) => item === 'diameter',
        ) && <option>diameter</option> }
        { !listaColunas.find(
          (item) => item === 'rotation_period',
        ) && <option>rotation_period</option> }
        { !listaColunas.find(
          (item) => item === 'surface_water',
        ) && <option>surface_water</option> }
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

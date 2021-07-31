import React, { useContext } from 'react';
import PlanetsContext from '../../Context/PlanetsContext';

function CategoriesFilter() {
  const { getColumn, getComparison,
    getValue, value, getButton, getOnChangeInputs } = useContext(PlanetsContext);

  function handleChangeColumn(event) {
    getColumn(event.target.value);
  }

  function handleChangeComparison(event) {
    getComparison(event.target.value);
  }

  function handleChangeValue(event) {
    getValue(event.target.value);
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (e) => {
          handleChangeColumn(e);
          getOnChangeInputs(false);
        } }
      >
        <option selected value="surface_water">Surface water</option>
        <option value="diameter">Diameter</option>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital period</option>
        <option value="rotation_period">Rotation period</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => {
          handleChangeComparison(e);
          getOnChangeInputs(false);
        } }
      >
        <option selected value="igual">igual a</option>
        <option value="maior">maior que</option>
        <option value="menor">menor que</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ (e) => {
          handleChangeValue(e);
          getOnChangeInputs(false);
        } }
        id="numberInput"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          getButton(true);
          getOnChangeInputs(true);
        } }
        // onMouseUp={ () => getButton(false) }
      >
        Enviar
      </button>
    </div>
  );
}

export default CategoriesFilter;

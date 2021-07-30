import React, { useContext } from 'react';
import PlanetsContext from '../../Context/PlanetsContext';

function CategoriesFilter() {
  const { getColumn, getComparison,
    getValue, value, getButton/* , getOnChangeInputs */ } = useContext(PlanetsContext);

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
        onChange={ (e) => {
          handleChangeColumn(e);
          // getOnChangeInputs(false);
        } }
        data-testid="column-filter"
      >
        <option value="surface_water">Surface water</option>
        <option value="diameter">Diameter</option>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital period</option>
        <option value="rotation_period">Rotation period</option>
      </select>
      <select
        onChange={ (e) => {
          handleChangeComparison(e);
          // getOnChangeInputs(false);
        } }
        data-testid="comparison-filter"
      >
        <option value="igual">igual a</option>
        <option value="maior">maior que</option>
        <option value="menor">menor que</option>
      </select>
      <label htmlFor="numberInput">
        <input
          type="number"
          value={ value }
          onChange={ (e) => {
            handleChangeValue(e);
            // getOnChangeInputs(false);
          } }
          id="numberInput"
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => getButton(true) }
        // onMouseUp={ () => getButton(false) }
        data-testid="button-filter"
      >
        Enviar
      </button>
    </div>
  );
}

export default CategoriesFilter;

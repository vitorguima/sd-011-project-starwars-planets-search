import React, { useContext } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';

function Select() {
  const { filters, setFilters } = useContext(PlanetsContext);

  function handleChangeSelectName({ target }) {
    const { value } = target;
    return value;
  }

  function handleChangeSelecCompare({ target }) {
    const { value } = target;
    return value;
  }

  function handleChangeNumber({ target }) {
    const { value } = target;
    return value;
  }

  function handleClickSetValues() {
    const valueName = handleChangeSelectName();
    const valueCompare = handleChangeSelecCompare();
    const valueNumber = handleChangeNumber();
    setFilters({ ...filters,
      filterByName: [...filterByNumericValues,
        { column: valueName, comparison: valueCompare, value: valueNumber }] });
  }

  return (
    <div>
      Filtros:
      <select
        data-testid="name-filter"
        onChange={ handleChangeSelectName }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleChangeSelecCompare }
      >
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="Igual a">Igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleChangeNumber }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickSetValues }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Select;

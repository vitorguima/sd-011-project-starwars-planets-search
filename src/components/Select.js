import React, { useContext, useState } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';

function Select() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const [nameSelect, setName] = useState('orbital_period');
  const [nameCompare, setCompare] = useState('maior que');
  const [nameNumber, setNumber] = useState(0);

  function handleChangeSelectName({ target }) {
    const { value } = target;
    setName(value);
  }

  function handleChangeSelecCompare({ target }) {
    const { value } = target;
    setCompare(value);
  }

  function handleChangeNumber({ target }) {
    const { value } = target;
    setNumber(value);
  }

  function handleClickSetValues() {
    setFilters({ ...filters,
      filterByNumericValues:
        [{ column: nameSelect, comparison: nameCompare, value: nameNumber }] });
  }

  return (
    <div>
      Filtros:
      <select
        data-testid="column-filter"
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
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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

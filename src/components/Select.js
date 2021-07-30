import React, { useContext, useState } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';

function Select() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const select = [
    {
      population: 'population',
      orbital_period: 'orbital_period',
      diameter: 'diameter',
      rotation_period: 'rotation_period',
      surface_water: 'surface_water',
    },
  ];
  const { column } = filters.filterByNumericValues[0];
  const filterCases = Object.keys(select[0]);
  const filterSelect = filterCases.filter((item) => item !== column);

  const [nameSelect, setName] = useState('population');
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
        {filterSelect.map((itens, key) => (
          <option value={ itens } key={ key }>{itens}</option>
        ))}
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

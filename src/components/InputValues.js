import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputValues() {
  const { filters, setFilters, exceptions } = useContext(PlanetsContext);

  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  function renderColumns() {
    return (columns.map((column, index) => {
      if (!exceptions.includes(column)) {
        return <option key={ index }>{column}</option>;
      }
      return '';
    }));
  }

  return (
    <div>
      <input
        value={ filters.inputText }
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => {
          setFilters({ ...filters, inputText: value });
        } }
      />

      <select
        value={ filters.columnFilter }
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => {
          setFilters({ ...filters, columnFilter: value });
        } }
      >
        { renderColumns() }
      </select>

      <select
        value={ filters.comparissionFilter }
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => {
          setFilters({ ...filters, comparissionFilter: value });
        } }
      >
        <option>Nenhum</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        value={ filters.value }
        type="number"
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => {
          setFilters({ ...filters, value });
        } }
      />
    </div>
  );
}

export default InputValues;

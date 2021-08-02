import React, { useContext } from 'react';
import Context from '../context/Context';

export default function FilterPlanets() {
  const { filters, setFilters } = useContext(Context);

  const handleFilterPlanets = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const handleNumericValues = () => {
    const column = document.getElementById('column-filter').value;
    const comparison = document.getElementById('comparison-filter').value;
    const ammount = document.getElementById('value-filter').value;
    setFilters({ ...filters,
      filterByNumericValues: [
        {
          column,
          comparison,
          value: ammount,
        },
      ] });
  };

  function optionsFilter() {
    const columnNames = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    const { filterByNumericValues } = filters;

    if (filterByNumericValues.length === 0) {
      return (
        <select id="column-filter" data-testid="column-filter">
          {columnNames.map((columnName, index) => (
            <option key={ index }>{ columnName }</option>))}
        </select>
      );
    }

    const { column } = filterByNumericValues[0];
    const filteredOptions = columnNames.filter((columnName) => (columnName !== column));

    return (
      <select id="column-filter" data-testid="column-filter">
        { filteredOptions.map((columnName, index) => (
          <option key={ index }>{ columnName }</option>)) }
      </select>
    );
  }

  return (
    <div>
      <input data-testid="name-filter" type="text" onChange={ handleFilterPlanets } />

      { optionsFilter() }

      <select id="comparison-filter" data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input id="value-filter" data-testid="value-filter" type="number" />

      <button
        type="submit"
        data-testid="button-filter"
        onClick={ handleNumericValues }
      >
        Filtrar
      </button>

    </div>
  );
}

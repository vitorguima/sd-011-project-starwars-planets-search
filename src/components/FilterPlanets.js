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

  return (
    <div>
      <input data-testid="name-filter" type="text" onChange={ handleFilterPlanets } />

      <select id="column-filter" data-testid="column-filter">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

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

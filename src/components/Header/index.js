import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Header() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const handleInputChange = ({ value }) => {
    setFilters({
      ...filters, filterByName: { name: value },
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const FORM = event.target;
    const COLUMN_FILTER = FORM.children[0];
    const COMPARISON_FILTER = FORM.children[1];
    const VALUE_FILTER = FORM.children[2];

    setFilters({
      ...filters,
      filterByNumericValues: [{
        column: COLUMN_FILTER.value,
        comparison: COMPARISON_FILTER.value,
        value: Number(VALUE_FILTER.value),
      }],
    });
  };

  return (
    <>
      <input
        type="text"
        name="name-filter"
        value={ filters.filterByName.name }
        data-testid="name-filter"
        onChange={ ({ target }) => handleInputChange(target) }
      />
      <form id="form-filter" onSubmit={ (event) => handleFormSubmit(event) }>
        <select
          name="column-filter"
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
        >
          <option value="maior_que">maior que</option>
          <option value="igual">igual a</option>
          <option value="menor_que">menor que</option>
        </select>
        <input type="number" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">
          Filtrar
        </button>
      </form>
    </>
  );
}

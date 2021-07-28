import React, { useState, useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Header() {
  const OPTIONS_TO_COMPARISON = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [options, setOptions] = useState(OPTIONS_TO_COMPARISON);

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

    const newOptions = options.filter((option) => option !== COLUMN_FILTER.value);
    setOptions(newOptions);
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
          {
            options.map((option, index) => (
              <option key={ index } value={ option }>{ option }</option>
            ))
          }
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input type="number" data-testid="value-filter" />
        <button type="submit" data-testid="button-filter">
          Filtrar
        </button>
      </form>
    </>
  );
}

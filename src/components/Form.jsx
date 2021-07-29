import React, { useContext, useState } from 'react';
import StarsContext from '../context/StarsContext';

export default function Form() {
  const [forms, setForms] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const { filters, setFilters } = useContext(StarsContext);

  function handleFilters({ target: { name, value } }) {
    setForms({ ...forms, [name]: value });
  }

  function clickToFilter() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, forms],
    });
  }

  return (
    <div>
      <form action="">
        <select
          value={ forms.column }
          onChange={ (e) => handleFilters(e) }
          name="column"
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          value={ forms.comparison }
          onChange={ (e) => handleFilters(e) }
          name="comparison"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="num">
          <input
            value={ forms.value }
            onChange={ (e) => handleFilters(e) }
            name="value"
            data-testid="value-filter"
            type="number"
            id="num"
          />
        </label>
        <button
          onClick={ clickToFilter }
          data-testid="button-filter"
          type="button"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

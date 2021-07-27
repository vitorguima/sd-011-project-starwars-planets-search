import React from 'react';

export default function SelectInput(handler) {
  return (
    <form>
      <label htmlFor="filterBy">
        Filter by:
        <select
          name="filterBy"
          data-testid="column-filter"
          onChange={ (e) => handler(e) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Compare by:
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => handler(e) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value-filter"
          data-testid="value-filter"
          onChange={ (e) => handler(e) }
        />
      </label>
      <button
        type="button"
        name="add-filter"
        data-testid="button-filter"
        onChange={ (e) => handler(e) }
      >
        {' '}
        Add Filter
      </button>
    </form>
  );
}

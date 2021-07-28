import React from 'react';
import useHookState from './hooks/useHookState';

export default function InputColumn() {
  const { handleClickSubmit } = useHookState();

  const handleSumbitForm = (e) => {
    e.preventDefault();
    const { target } = e;

    const data = new FormData(target);
    const column = data.get('column');
    const comparison = data.get('comparison');
    const value = data.get('value');

    const obj = { column, comparison, value };
    handleClickSubmit(obj);
  };

  return (
    <form onSubmit={ (e) => handleSumbitForm(e) }>
      <label htmlFor="select-column">
        Filter by column:
        <select data-testid="column-filter" name="column">
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="select-comparison">
        Filter by comparison:
        <select data-testid="comparison-filter" name="comparison">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="select-quantity">
        Filter by quantity:
        <input
          data-testid="value-filter"
          type="number"
          name="value"
        />
      </label>
      <button data-testid="button-filter" type="submit">
        filtrar
      </button>
    </form>
  );
}

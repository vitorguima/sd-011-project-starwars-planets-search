import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function FilterByName() {
  const { globalFilter, setNameFilter } = useContext(planetsContext);
  const { filters: { filterByName: { name } } } = globalFilter;

  function handleChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setNameFilter(value);
  }

  return (
    <input
      type="text"
      data-testid="name-filter"
      id="name"
      value={ name }
      onChange={ handleChange }
    />
  );
}

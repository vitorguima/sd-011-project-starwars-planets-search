import React from 'react';
import { useGlobalContext } from '../hooks/Context';

const Filter = () => {
  const { handleChange, name, handleChangeInputs, filterComparison } = useGlobalContext();
  const { column, comparison, value } = filterComparison;
  return (
    <form>
      <input
        name="name"
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
        value={ name }
      />
      <select
        name="column"
        value={ column }
        onChange={ handleChangeInputs }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        value={ comparison }
        onChange={ handleChangeInputs }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ value }
        onChange={ handleChangeInputs }
        type="number"
        data-testid="value-filter"
      />
      <button type="button" onClick={ filterComparison } data-testid="button-filter">
        Filter
      </button>
    </form>
  );
};

export default Filter;

import React from 'react';
import { useGlobalContext } from '../hooks/Context';

const Filter = () => {
  const {
    options,
    handleChange,
    name,
    handleChangeInputs,
    filterComparison,
    handleClick } = useGlobalContext();
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
        {options.map((option, index) => <option key={ index }>{option}</option>)}
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
      <button type="button" onClick={ handleClick } data-testid="button-filter">
        Filter
      </button>
    </form>
  );
};

export default Filter;

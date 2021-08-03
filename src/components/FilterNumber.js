import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterNumber() {
  const { setFilter, filters, FilterNumberFunc } = useContext(PlanetContext);
  const [atualState, setAtualState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  function handleChange({ target }) {
    const { value, name } = target;
    setAtualState({
      ...atualState,
      [name]: value,
    });
  }

  function handleClick() {
    setFilter({
      ...filters,
      filterByNumericValues: [
        {
          column: atualState.column,
          comparison: atualState.comparison,
          value: atualState.value,
        },
      ],
    });
    FilterNumberFunc();
  }

  return (
    <form>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        <option name="column" value="population">population</option>
        <option name="column" value="orbital_period">orbital_period</option>
        <option name="column" value="diameter">diameter</option>
        <option name="column" value="rotation_period">rotation_period</option>
        <option name="column" value="surface_water">surface_water</option>
      </select>
      <select name="comparison" data-testid="comparison-filter" onChange={ handleChange }>
        <option name="comparison" value="maior que">maior que</option>
        <option name="comparison" value="menor que">menor que</option>
        <option name="comparison" value="igual a">igual a</option>
      </select>
      <input
        name="value"
        data-testid="value-filter"
        placeholder="Digite o valor"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        filtrar
      </button>
    </form>
  );
}

export default FilterNumber;

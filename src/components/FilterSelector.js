import React, { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function FilterSelector() {
  const { setSelectFilter, setNameFilter, filters } = useContext(planetsContext);
  const { filterByName: { name } } = filters;
  const [selectors, setSelectors] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const { column, comparison, value } = selectors;

  function handleNameChange({ target }) {
    const nameValue = target.type === 'checkbox' ? target.checked : target.value;
    setNameFilter(nameValue);
  }

  function handleChange({ target }) {
    const { id } = target;
    const selectValue = target.type === 'checkbox' ? target.checked : target.value;
    setSelectors({ ...selectors, [id]: selectValue });
  }

  function handleClick() {
    setSelectFilter(selectors);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        id="name"
        value={ name }
        onChange={ handleNameChange }
      />
      <select
        onChange={ handleChange }
        id="column"
        value={ column }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ handleChange }
        id="comparison"
        value={ comparison }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleChange }
        id="value"
        value={ value }
        type="number"
        data-testid="value-filter"
      />
      <button onClick={ handleClick } type="button" data-testid="button-filter">
        Adicionar filtro
      </button>
    </div>
  );
}

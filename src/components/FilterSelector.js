import React, { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function FilterSelector() {
  const { setSelectFilter,
    setNameFilter,
    filters,
    options, filteredOptions, getNameToRemoveFilter } = useContext(planetsContext);
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

  function handleFilterChange({ target }) {
    const { id } = target;
    const selectValue = target.type === 'checkbox' ? target.checked : target.value;
    setSelectors({ ...selectors, [id]: selectValue });
  }

  function handleAddFilter() {
    setSelectFilter(selectors);
  }

  function handleFilterRemoval({ target }) {
    const { id } = target;
    getNameToRemoveFilter(id);
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
        onChange={ handleFilterChange }
        id="column"
        value={ column }
        data-testid="column-filter"
      >
        {options.map((selectOption, index) => (
          <option key={ index } value={ selectOption }>{selectOption}</option>
        ))}
      </select>
      <select
        onChange={ handleFilterChange }
        id="comparison"
        value={ comparison }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleFilterChange }
        id="value"
        value={ value }
        type="number"
        data-testid="value-filter"
      />
      <button onClick={ handleAddFilter } type="button" data-testid="button-filter">
        Adicionar filtro
      </button>
      {filteredOptions.map((filterToList, index) => (
        <div data-testid="filter" key={ index }>
          <span>{filterToList}</span>
          <button
            id={ filterToList }
            type="button"
            onClick={ handleFilterRemoval }
          >
            X
          </button>
        </div>
      ))}
      {/* <button type="button" onClick={ console.log(filteredData, filters) }>
        view filters e array de planetas
      </button> */}
    </div>
  );
}

import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Form() {
  const {
    data,
    userSelection,
    handleInputChange,
    handleDropdownChange,
    addDropdownFilter,
    removeFilter,
    handleRadioOrderChange,
    handleColumnNameChange,
    handleColumnOrderChange,
  } = useContext(TableContext);
  const { filterByName: { name }, filterByNumericValues } = userSelection.filters;

  const availableDropdownColumns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const filteredDropdown = availableDropdownColumns
    .filter((col) => !filterByNumericValues.find(({ column }) => col === column));

  return (
    <form action="">
      <label htmlFor="planet">
        Planet:
        <input
          onChange={ handleInputChange }
          data-testid="name-filter"
          value={ name }
          placeholder="Planet name..."
          type="text"
          id="planet"
        />
      </label>
      <select onChange={ handleDropdownChange } data-testid="column-filter" id="column">
        {
          filteredDropdown.map((column, key) => (
            <option value={ column } key={ key }>{ column }</option>
          ))
        }
      </select>
      <select
        onChange={ handleDropdownChange }
        data-testid="comparison-filter"
        id="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleDropdownChange }
        data-testid="value-filter"
        type="text"
        id="value"
      />
      <button
        onClick={ addDropdownFilter }
        data-testid="button-filter"
        type="button"
      >
        Filter
      </button>
      <select data-testid="column-sort" onChange={ handleColumnNameChange }>
        {
          data.map((planet, key) => {
            const tag = Object.keys(planet).filter((pName) => pName !== 'residents')[key];
            return <option key={ key }>{ tag }</option>;
          })
        }
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          onClick={ handleRadioOrderChange }
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          name="sort-radio"
          type="radio"
          // checked
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          onClick={ handleRadioOrderChange }
          data-testid="column-sort-input-desc"
          value="DESC"
          id="DESC"
          name="sort-radio"
          type="radio"
        />
      </label>
      <button
        onClick={ handleColumnOrderChange }
        data-testid="column-sort-button"
        type="button"
      >
        Ordenar
      </button>
      { filterByNumericValues.map(({ column, comparison, value }, key) => (
        <div style={ { display: 'flex' } } data-testid="filter" key={ key }>
          <h4>
            Coluna:
            <span>{ column }</span>
          </h4>
          <h4>
            Comparação:
            <span>{ comparison }</span>
          </h4>
          <h4>
            Valor:
            <span>{ value }</span>
          </h4>
          <button onClick={ () => removeFilter(key) } type="button">x</button>
        </div>
      )) }
    </form>
  );
}

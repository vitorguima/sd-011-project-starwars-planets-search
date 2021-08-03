import React, { useContext } from 'react';
import TabelaContext from '../context/TabelaContext';

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
  } = useContext(TabelaContext);
  const { filterByName: { name }, filterByNumericValues } = userSelection.filters;

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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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

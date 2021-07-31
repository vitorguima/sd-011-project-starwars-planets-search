import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table() {
  const {
    isLoading,
    userSelection,
    handleChange,
    handleDropdownChange,
    addDropdownFilter,
    removeFilter,
  } = useContext(TableContext);
  const { filterByName: { name }, filterByNumericValues } = userSelection.filters;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <form action="">
        <label htmlFor="planet">
          Planet:
          <input
            onChange={ (e) => handleChange(e) }
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
      <table>
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
}

import React from 'react';
import { useGlobalContext } from '../context';

export default function Navbar() {
  const {
    handleChange,
    name,
    handleChangeInputs,
    filterComparison,
    handleClick } = useGlobalContext();
  const { column, comparison, value } = filterComparison;
  return (
    <nav>
      <form>
        <label htmlFor="name">
          Search by name
          <input
            id="name"
            name="name"
            type="text"
            data-testid="name-filter"
            onChange={ handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="searchfor">
          Search for
          <select
            name="column"
            value={ column }
            onChange={ handleChangeInputs }
            id="searchfor"
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="quantity">
          Quantity
          <select
            name="comparison"
            value={ comparison }
            onChange={ handleChangeInputs }
            id="quantity"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="num">
          <input
            name="value"
            value={ value }
            onChange={ handleChangeInputs }
            id="num"
            type="number"
            data-testid="value-filter"
          />
        </label>
        <button onClick={ handleClick } data-testid="button-filter" type="button">
          Filtrar
        </button>
      </form>
    </nav>
  );
}

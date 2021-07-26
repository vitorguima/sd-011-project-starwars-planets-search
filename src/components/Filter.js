import React from 'react';
import GlobalContext from '../context/GlobalContext';

function Filter() {
  const { filterName,
    setFilterName,
    filterName: { filters },
  } = React.useContext(GlobalContext);

  function handleFilterNameChange({ target }) {
    setFilterName({ ...filterName,
      filters: {
        filterByName: {
          name: target.value,
        },
        filterByNumericValues: filters.filterByNumericValues,
      } });
  }

  function handleColumnFilterChange({ target }) {
    const { name, value } = target;
    if (name === 'column-filter') {
      setFilterName({ ...filterName,
        filters: {
          filterByName: filters.filterByName,
          filterByNumericValues: [{
            column: value,
            comparison: filters.filterByNumericValues[0].comparison,
            value: filters.filterByNumericValues[0].value,
          }],
        } });
    }
    if (name === 'comparison-filter') {
      setFilterName({ ...filterName,
        filters: {
          filterByName: filters.filterByName,
          filterByNumericValues: [{
            column: filters.filterByNumericValues[0].column,
            comparison: value.replace('-', ' '),
            value: filters.filterByNumericValues[0].value,
          }],
        } });
    }
    if (name === 'value-filter') {
      setFilterName({ ...filterName,
        filters: {
          filterByName: filters.filterByName,
          filterByNumericValues: [{
            column: filters.filterByNumericValues[0].column,
            comparison: filters.filterByNumericValues[0].comparison,
            value,
          }],
        } });
    }
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Filtro por nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ handleFilterNameChange }
        />
      </label>
      <label htmlFor="column-filter">
        Filtro da coluna:
        <select
          data-testid="column-filter"
          name="column-filter"
          onChange={ handleColumnFilterChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Relação:
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          onChange={ handleColumnFilterChange }
        >
          <option value="maior-que">maior que</option>
          <option value="menor-que">menor que</option>
          <option value="igual-a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Quantidade:
        <input
          type="number"
          name="value-filter"
          data-testid="value-filter"
          onChange={ handleColumnFilterChange }
        />
      </label>
      <button type="button" data-testid="button-filter">Acionar filtro</button>
    </form>
  );
}

export default Filter;

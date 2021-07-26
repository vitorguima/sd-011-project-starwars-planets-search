import React from 'react';
import GlobalContext from '../context/GlobalContext';

function Filter() {
  const { filterName,
    setFilterName,
    filterName: { filters },
  } = React.useContext(GlobalContext);
  const [column, setColumn] = React.useState('population');
  const [comparison, setComparison] = React.useState('maior que');
  const [values, setValues] = React.useState(0);

  function handleFilterNameChange({ target }) {
    setFilterName({ ...filterName,
      filters: {
        filterByName: {
          name: target.value,
        },
        filterByNumericValues: filters.filterByNumericValues,
      } });
  }

  function handleClick() {
    setFilterName({ ...filterName,
      filters: {
        filterByName: filters.filterByName,
        filterByNumericValues: [{
          column,
          comparison,
          value: values,
        }],
      } });
  }

  function handleColumnFilterChange({ target }) {
    const { name, value } = target;
    if (name === 'column-filter') {
      setColumn(value);
    }
    if (name === 'comparison-filter') {
      setComparison(value);
    }
    if (name === 'value-filter') {
      setValues(value);
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
          id="name-filter"
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
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
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
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Acionar filtro
      </button>
    </form>
  );
}

export default Filter;

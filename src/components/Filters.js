import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    setNameFilter,
    filters: { filterByName: { name } },
    handleNumericFilter,
    setUpdateFilter,
  } = useContext(Context);

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ name }
        onKeyUp={ ({ target }) => setNameFilter(target.value) }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => handleNumericFilter(e.target) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (e) => handleNumericFilter(e.target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        onChange={ (e) => handleNumericFilter(e.target) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => setUpdateFilter(true) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;

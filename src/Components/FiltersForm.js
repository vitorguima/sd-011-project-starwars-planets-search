import React, { useContext } from 'react';
import planetContext from '../Context/PlanetContext';

function FiltersForm() {
  const { changeNameFilter, filters } = useContext(planetContext);
  return (
    <form>
      <label htmlFor="name">
        Filtre pelo nome
        <input
          type="text"
          id="name"
          data-testid="name-filter"
          value={ filters.name }
          onChange={ ({ target: { value } }) => changeNameFilter(value) }
        />
      </label>
    </form>
  );
}

export default FiltersForm;

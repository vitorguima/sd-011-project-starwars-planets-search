import React, { useContext } from 'react';
import SWPlanetsContext from '../context/Context';

function FilterByName() {
  const { filters: { filterByName: { name } }, setFilters } = useContext(SWPlanetsContext);

  const handleChange = ({ target }) => {
    setFilters({ filterByName: { name: target.value } });
  };

  return(
    <label htmlFor="filter-by-name">
      FILTER BY NAME:
      <input
        type="text"
        data-testid="name-filter"
        id="filter-by-name"
        onChange={ handleChange }
        value={ name }
      />
    </label>
  );
}

export default FilterByName;
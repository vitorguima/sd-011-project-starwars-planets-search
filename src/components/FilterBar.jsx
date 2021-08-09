import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterBar() {
  const { handleFilter } = useContext(PlanetsContext);

  const handleChange = ({ target: { value } }) => {
    handleFilter(value);
  };

  return (
    <div>
      <label htmlFor="search-name">
        <input
          type="text"
          name="search-name"
          data-testid="name-filter"
          placeholder="Pesquise pelo nome"
          onChange={ handleChange }
        />
      </label>
    </div>

  );
}

export default FilterBar;

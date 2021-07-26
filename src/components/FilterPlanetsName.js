import React, { useContext } from 'react';
import planetContext from '../Context/planetContext';

const FilterPlanetsName = () => {
  const { name, handleChange } = useContext(planetContext);

  return (
    <form>
      <label htmlFor="name">
        Filter by Name:
        <input
          onChange={ ({ target: { value } }) => handleChange(value) }
          data-testid="name-filter"
          type="text"
          name="name"
          value={ name }
        />
      </label>
    </form>
  );
};

export default FilterPlanetsName;

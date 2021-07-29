import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function FilterByName() {
  const { setFilters, filters } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ handleChange }
    />
  );
}

export default FilterByName;

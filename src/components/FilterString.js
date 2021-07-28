import React, { useContext } from 'react';
import MyContext from './MyContext';

function FilterString() {
  const { setFilters } = useContext(MyContext);

  const setText = ({ target: { value } }) => {
    setFilters({ filterByName: { name: value.toLowerCase() } });
  };

  return (
    <div>
      <label htmlFor="filterByName">
        Nome do Planeta:
        <input
          type="text"
          data-testid="name-filter"
          id="filterByName"
          onChange={ (e) => setText(e) }
        />
      </label>
    </div>
  );
}

export default FilterString;

import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Filter() {
  const { filters, setFilters } = useContext(StarContext);
  const filterByName = ({ target }) => {
    setFilters({ ...filters, filters: { filterByName: { name: target.value } } });
  };

  return (

    <label htmlFor="filterByName">
      <input
        type="text"
        name="filterByName"
        onChange={ filterByName }
        data-testid="name-filter"
      />
    </label>

  );
}

export default Filter;

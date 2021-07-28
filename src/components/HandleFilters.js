import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function HandleFilters() {
  const {
    // data,
    // setData,
    setFilters,
    filters,
    // setFilteredPlanets,
    // setData,
    // filterPlanets,
    // setOnlyPlanets,
    // name,
  } = useContext(MyContext);

  return (
    <form>
      <label htmlFor="filter-name" className="input">
        Filtro:
        <input
          id="filter-name"
          name="filter-name"
          data-testid="name-filter"
          onChange={ (e) => setFilters({ ...filters,
            filterByName: { name: e.target.value } }) }
        />
      </label>
    </form>
  );
}

export default HandleFilters;

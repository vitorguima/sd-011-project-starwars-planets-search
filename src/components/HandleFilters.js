import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function HandleFilters() {
  const {
    planetsResult,
    setPlanetsResult,
    // filters,
    setFilters,
    // filteredName,
    // setFilteredName,
    name,
  } = useContext(MyContext);

  function filterPlanetByName({ target }) {
    setFilters(target.value);
    const filteredInput = planetsResult.filter(
      (planet) => planet.name.toLowerCase().includes(target.value),
    );
    setPlanetsResult(filteredInput);
  }

  return (
    <form>
      <label htmlFor="filter-name" className="input">
        Filtro:
        <input
          id="filter-name"
          name="filter-name"
          data-testid="name-filter" // ({ e }) => filterPlanetByName({ ...filters, filterByName: { name: e.target.value } })
          value={ name }
          onChange={ filterPlanetByName }
        />
      </label>
    </form>
  );
}

export default HandleFilters;

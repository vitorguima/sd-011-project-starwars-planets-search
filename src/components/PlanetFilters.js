import React, { useContext, useState } from 'react';
import SpacesContext from '../context/SpacesContext';

function PlanetFilters() {
  const {
    filters,
    setFilters,
    setFilteredPlanets,
    planetList,
  } = useContext(SpacesContext);

  const [planetName, setPlanetName] = useState('');

  function handleNameInput(target) {
    const { value } = target;
    setPlanetName(value);
    setFilters({ ...filters, filterByName: { name: value } });
    setFilteredPlanets(
      planetList.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())),
    );
  }

  return (
    <div>
      <label htmlFor="filter-by-name">
        <input
          id="filter-by-name"
          type="text"
          data-testid="name-filter"
          placeholder="busque pelo nome"
          name="name-filter"
          value={ planetName }
          onChange={ ({ target }) => handleNameInput(target) }
        />
      </label>
    </div>
  );
}

export default PlanetFilters;

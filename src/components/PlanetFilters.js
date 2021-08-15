import React, { useContext, useState } from 'react';
import SpacesContext from '../context/SpacesContext';
import NumberFilters from './NumberFilters';

function PlanetFilters() {
  const {
    filters,
    setFilters,
    setFilteredPlanets,
    filteredPlanets,
  } = useContext(SpacesContext);

  const [sortedBy, setSortedBy] = useState('');
  const [columnType, setColumnType] = useState('orbital_period');

  function handleFilters() {
    setFilters({
      ...filters,
      order: {
        column: columnType,
        sort: sortedBy,
      },
    });
  }

  function sortPlanets(column, type) {
    const sortTypes = {
      population: {
        ASC: () => filteredPlanets
          .sort((a, b) => Number(a.population) - Number(b.population)),
        DESC: () => filteredPlanets
          .sort((a, b) => Number(b.population) - Number(a.population)),
      },
      orbital_period: {
        ASC: () => filteredPlanets
          .sort((a, b) => Number(a.orbital_period) - Number(b.orbital_period)),
        DESC: () => filteredPlanets
          .sort((a, b) => Number(b.orbital_period) - Number(a.orbital_period)),
      },
      diameter: {
        ASC: () => filteredPlanets
          .sort((a, b) => Number(a.diameter) - Number(b.diameter)),
        DESC: () => filteredPlanets
          .sort((a, b) => Number(b.diameter) - Number(a.diameter)),
      },
      rotation_period: {
        ASC: () => filteredPlanets
          .sort((a, b) => Number(a.rotation_period) - Number(b.rotation_period)),
        DESC: () => filteredPlanets
          .sort((a, b) => Number(b.rotation_period) - Number(a.rotation_period)),
      },
      surface_water: {
        ASC: () => filteredPlanets
          .sort((a, b) => Number(a.surface_water) - Number(b.surface_water)),
        DESC: () => filteredPlanets
          .sort((a, b) => Number(b.surface_water) - Number(a.surface_water)),
      },
    };

    if (column && type) {
      handleFilters();
      setFilteredPlanets(sortTypes[column][type]());
    }
  }

  return (
    <div>
      <NumberFilters />
      <label htmlFor="filter-by-column">
        Ordenar lista
        <select
          data-testid="column-sort"
          id="filter-by-column"
          value={ columnType }
          onChange={ ({ target }) => setColumnType(target.value) }
          name="comparison"
        >
          <option value="orbital_period">orbital_period</option>
          <option value="population">population</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="ASC">
        ASC
        <input
          name="sort"
          type="radio"
          value="ASC"
          id="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setSortedBy(target.value) }
        />
      </label>
      <label htmlFor="DS">
        DESC
        <input
          name="sort"
          type="radio"
          value="DESC"
          id="DS"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setSortedBy(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortPlanets(columnType, sortedBy) }
      >
        Ordenar
      </button>
    </div>
  );
}

export default PlanetFilters;

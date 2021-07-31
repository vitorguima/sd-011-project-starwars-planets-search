import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/planetContext';

function Table() {
  const {
    isLoading,
    keys,
    setFilters,
    filters,
    filteredByNumber,
    arrayPlanets,
  } = useContext(PlanetContext);
  const [localFilter, setLocalFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  function submit() {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, localFilter],
    });
    const column = document.getElementById('column-filter');
    const option = document.getElementById(`${localFilter.column}`);
    column.removeChild(option);
  }

  useEffect(() => {
    filteredByNumber();
  }, [filters]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setFilters({ ...filters,
          filterByName: {
            name: e.target.value,
          } }) }
      />
      <select
        data-testid="column-filter"
        id="column-filter"
        onChange={ (e) => setLocalFilter({ ...localFilter, column: e.target.value }) }
      >
        <option value="population" id="population">population</option>
        <option value="orbital_period" id="orbital_period">orbital_period</option>
        <option value="diameter" id="diameter">diameter</option>
        <option value="rotation_period" id="rotation_period">rotation_period</option>
        <option value="surface_water" id="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setLocalFilter({ ...localFilter, comparison: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setLocalFilter({ ...localFilter, value: e.target.value }) }
      />
      <button
        type="button"
        onClick={ submit }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {!isLoading && keys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {!isLoading && arrayPlanets
            .filter((planet) => planet.name.includes(filters.filterByName.name))
            .map((planet, index) => (
              <tr key={ index }>
                {keys.map((key) => <td key={ key }>{planet[key]}</td>)}
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

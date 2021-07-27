import React, { useState } from 'react';
import { useAuth } from '../providers/auth';

function SearchPlanet() {
  const [state, setState] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });

  const { filters, setFilters } = useAuth();

  const inputPlanetNameHandleChange = (event) => {
    setFilters({
      ...filters,
      filterByName: {
        name: event.target.value,
      },
    });
  };

  const sendFiltersToGlobalState = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column: state.columnFilter,
          comparison: state.comparisonFilter,
          value: state.valueFilter,
        },
      ],
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="planet-name">
          Planet name:
          <input
            type="text"
            id="planet-name"
            data-testid="name-filter"
            onChange={ inputPlanetNameHandleChange }
          />
        </label>
        <div>
          <select
            testid="column-filter"
            onChange={ (event) => {
              setState({
                ...state,
                columnFilter: event.target.value,
              });
            } }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (event) => {
              setState({
                ...state,
                comparisonFilter: event.target.value,
              });
            } }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            type="number"
            testid="value-filter"
            onChange={ (event) => {
              setState({
                ...state,
                valueFilter: event.target.value,
              });
            } }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ sendFiltersToGlobalState }
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchPlanet;

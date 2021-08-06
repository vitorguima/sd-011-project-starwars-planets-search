import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormSelectors() {
  const { setColumn,
    setComparison,
    setValue,
    handleFilterButton,
    numeric,
  } = useContext(PlanetsContext);

  // https://github.com/tryber/sd-011-project-starwars-planets-search/blob/amandhawb-project-starwars/src/App.js - used this repo as reference
  const allColumns = numeric.map((item) => item.column);
  const showPopulation = !allColumns.includes('population');
  const showOrbital = !allColumns.includes('orbital_period');
  const showDiameter = !allColumns.includes('diameter');
  const showRotation = !allColumns.includes('rotation_period');
  const showSurface = !allColumns.includes('surface_water');

  return (
    <form>
      <label htmlFor="column">
        Filter by:
        <select
          onChange={ (event) => setColumn(event.target.value) }
          data-testid="column-filter"
        >
          {showPopulation && <option>population</option>}
          {showOrbital && <option>orbital_period</option>}
          {showDiameter && <option>diameter</option>}
          {showRotation && <option>rotation_period</option>}
          {showSurface && <option>surface_water</option>}
        </select>
      </label>
      <label htmlFor="comparison">
        Compare by:
        <select
          onChange={ (event) => setComparison(event.target.value) }
          data-testid="comparison-filter"
        >
          <option value="">Select your option</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Value:
        <input
          type="number"
          onChange={ (event) => setValue(event.target.value) }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => handleFilterButton() }
        data-testid="button-filter"
      >
        Set Filter
      </button>
    </form>
  );
}

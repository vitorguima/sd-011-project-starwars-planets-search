import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function App() {
  const { setfilterByName,
    setfilterByNumericValues,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  return (
    <div>
      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            placeholder="Search"
            onChange={ (event) => setfilterByName(event.target.value) }
          />
        </label>
      </form>
      <form>
        <label htmlFor="column-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ (event) => (setColumn(event.target.value)) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ (event) => (setComparison(event.target.value)) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
            onChange={ (event) => (setValue(event.target.value)) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setfilterByNumericValues(
            [...filterByNumericValues, { column, comparison, value }],
          ) }
        >
          Filter
        </button>
      </form>
    </div>
  );
}

export default App;

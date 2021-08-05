import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormSelectors() {
  const { setColumn,
    setComparison,
    setValue,
    handleFilterButton,
  } = useContext(PlanetsContext);

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <form>
      <label htmlFor="column">
        Filter by:
        <select
          onChange={ (event) => setColumn(event.target.value) }
          data-testid="column-filter"
        >
          { columns.map((col, i) => (
            <option key={ i } value={ col }>{ col }</option>)) }
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
      <button type="button" onClick={ () => handleFilterButton() }>Set Filter</button>
    </form>
  );
}

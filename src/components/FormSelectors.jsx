import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FormSelectors() {
  const { setColumn,
    setComparison,
    setValue,
    setNumeric,
    setTheRender,
    handleFilterButton,
    numeric,
    data,
  } = useContext(PlanetsContext);

  // https://github.com/tryber/sd-011-project-starwars-planets-search/blob/amandhawb-project-starwars/src/App.js - used this repo as reference
  const selectedColumns = numeric.map((item) => item.column);
  const allColumns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <form>
      <label htmlFor="column">
        Filter by:
        <select
          onChange={ (event) => setColumn(event.target.value) }
          data-testid="column-filter"
        >
          {allColumns.map((column) => !selectedColumns
            .includes(column) && <option>{column}</option>)}
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
      {numeric.map(({ column, value, comparison }, index) => (
        <>
          <p key={ index }>
            {`${column} ${comparison} ${value}`}
          </p>
          <button
            data-testid="filter"
            type="button"
            onClick={ () => {
              const num = numeric.filter((item) => item.column !== column);
              setNumeric(num);
              // console.log(numeric);
              if (num.length === 0) setTheRender(data);
            } }
          >
            X
          </button>
        </>
      ))}
    </form>
  );
}

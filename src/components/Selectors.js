import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Selectors() {
  const { setNumericFilters, filters } = useContext(PlanetContext);
  const { filterByNumericValues } = filters;
  const [customFilter, setCustomFilter] = useState(
    { column: '',
      comparison: '',
      value: '',
    },
  );

  const handleCustomFilter = ({ target }) => {
    const { name, value } = target;
    setCustomFilter({ ...customFilter, [name]: value });
  };
  let options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  if (filterByNumericValues.length > 0) {
    options = options.filter((option) => !filterByNumericValues
      .map(({ column }) => column).includes(option));
  }
  const { column, comparison, value } = customFilter;

  return (
    <div>
      <label htmlFor="option">
        <select
          id="option"
          data-testid="column-filter"
          value={ column }
          name="column"
          onChange={ handleCustomFilter }
        >
          { options.map((option) => <option key={ option }>{ option }</option>) }
        </select>
      </label>
      <select
        data-testid="comparison-filter"
        onChange={ handleCustomFilter }
        value={ comparison }
        name="comparison"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        Values:
        <input
          type="number"
          data-testid="value-filter"
          min="0"
          onChange={ handleCustomFilter }
          value={ value }
          name="value"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => { setNumericFilters(customFilter); } }
      >
        Filter
      </button>
    </div>
  );
}

export default Selectors;

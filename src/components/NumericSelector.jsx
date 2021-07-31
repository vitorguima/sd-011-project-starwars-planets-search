import React, { useContext, useState } from 'react';
import Context from '../context/Context';

const columnArray = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];
const comparisonArray = ['maior que', 'menor que', 'igual a'];

const NumericSelector = () => {
  const { filterName, setFilterName } = useContext(Context);
  const [selectorState, setSelectorState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '1',
  });

  function handleEventChanges({ target }) {
    setSelectorState({ ...selectorState, [target.name]: target.value });
  }

  function updateFilters() {
    setFilterName({ ...filterName,
      filters: {
        filterByName: { name: '' },
        filterByNumericValues: {
          column: selectorState.column,
          comparison: selectorState.comparison,
          value: selectorState.value,
        } } });
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ selectorState.column }
        onChange={ (event) => handleEventChanges(event) }
      >
        {columnArray.map((option, index) => <option key={ index }>{ option }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ selectorState.comparison }
        onChange={ (event) => handleEventChanges(event) }
      >
        {comparisonArray.map((option,
          index) => <option key={ index }>{ option }</option>)}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ selectorState.value }
        onChange={ (event) => handleEventChanges(event) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ updateFilters }
      >
        Filtrar
      </button>
    </div>
  );
};

export default NumericSelector;

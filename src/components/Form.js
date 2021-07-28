import React, { useContext, useState } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

function Form() {
  const {
    initialFilters,
    setInitialFilters,
    renderOptions,
    setRenderOptions,
  } = useContext(PlanetsContext);

  const { filterByNumericValues } = initialFilters;

  const [columnState, setColumnState] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('filtros');
  const [valueState, setValueState] = useState(0);

  const handleRenderOptions = () => {
    const filteredOptions = renderOptions
      .filter((filtered) => filtered
      !== columnState);
    setRenderOptions(filteredOptions);

    setInitialFilters({
      ...initialFilters,
      filterByNumericValues: [...filterByNumericValues,
        { column: columnState, comparison: comparisonValue, value: valueState }],
    });
  };

  return (
    <div>
      <label htmlFor="planetName">
        <input
          type="text"
          id="planetName"
          data-testid="name-filter"
          onChange={ ({ target }) => setInitialFilters({
            ...initialFilters, filterByName: { name: target.value } }) }
        />
      </label>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setColumnState(value) }
      >
        { renderOptions
          .map((option, index) => <option key={ index }>{ option }</option>) }
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setComparisonValue(value) }
      >
        <option>filtros</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        name="value"
        type="number"
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => setValueState(value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleRenderOptions() }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Form;

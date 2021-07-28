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

  // estados do componente
  const [columnState, setColumnState] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('filtros');
  const [valueState, setValueState] = useState(0);
  const [columnToSortOptions, setColumnToSortOptions] = useState('name');
  const [sortedOptions, setSortedOptions] = useState('ASC');
  //
  const columnsOptionsToSort = ['name', 'rotation_period', 'orbital_period',
    'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population',
    'films', 'created',
    'edited', 'url'];

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

  const handleSortedOptions = () => {
    setInitialFilters({
      ...initialFilters,
      order: { column: columnToSortOptions, sort: sortedOptions },
    });
  };

  return (
    <div>
      <input
        type="text"
        id="planetName"
        data-testid="name-filter"
        onChange={ ({ target }) => setInitialFilters({
          ...initialFilters, filterByName: { name: target.value } }) }
      />
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
      <select
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => setColumnToSortOptions(value) }
      >
        { columnsOptionsToSort.map((option, i) => (
          <option key={ i }>
            { option }
          </option>
        )) }
      </select>
      <label htmlFor="inputRadio">
        ASC
        <input
          type="radio"
          id="inputRadio"
          name="inputRadio"
          data-testid="column-sort-input-asc"
          checked={ sortedOptions === 'ASC' }
          onChange={ () => setSortedOptions('ASC') }
        />
      </label>
      <label htmlFor="inputRadio">
        DESC
        <input
          type="radio"
          id="inputRadio"
          name="inputRadio"
          data-testid="column-sort-input-desc"
          onChange={ () => setSortedOptions('DESC') }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSortedOptions() }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Form;

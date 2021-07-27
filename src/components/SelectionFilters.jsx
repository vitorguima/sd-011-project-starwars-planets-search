import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const comparisonDB = ['maior que', 'menor que', 'igual a'];

function SelectionFilter() {
  const [form, setForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  function handleEventChanges({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  const {
    setFilters, filters, columnFilters, setColumnFilters,
  } = useContext(PlanetsContext);

  function updateFilters() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, {
        column: form.column,
        comparison: form.comparison,
        value: form.value,
      }],
    });
    const columnWithoutUsedFilter = columnFilters.filter(
      (filter) => filter !== form.column,
    );
    setColumnFilters(columnWithoutUsedFilter);
    setForm({
      ...form,
      value: '',
    });
  }

  function returnOnColumnFilters(filterToReturn) {
    setColumnFilters([...columnFilters, filterToReturn]);
    const returningFilter = filters.filterByNumericValues.filter(
      (filterToClear) => filterToClear.column !== filterToReturn,
    );
    setFilters({
      ...filters,
      filterByNumericValues: returningFilter,
    });
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ form.column }
        onChange={ (event) => handleEventChanges(event) }
      >
        {columnFilters.map((option, index) => <option key={ index }>{ option }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ form.comparison }
        onChange={ (event) => handleEventChanges(event) }
      >
        {comparisonDB.map((option, index) => <option key={ index }>{ option }</option>)}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ form.value }
        onChange={ (event) => handleEventChanges(event) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ updateFilters }
      >
        Filtrar
      </button>
      <div>
        {filters.filterByNumericValues.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button
              type="button"
              onClick={ () => returnOnColumnFilters(filter.column) }
            >
              X
            </button>
          </div>))}
      </div>
    </div>
  );
}

export default SelectionFilter;

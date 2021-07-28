import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FormFilters() {
  const { filters,
    onClickButtonNumericValues,
    handleFilterByName,
    removeFromFilterByNumericValue,
  } = useContext(StarWarsContext);

  const initalColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const initialNumericForm = { column: 'population', comparison: 'maior que', value: 0 };
  const [numericByValueForm, setNumericForm] = useState(initialNumericForm);
  const [optionsColumn, setOptionsColumn] = useState(initalColumns);

  function handleFilterByNumericValues({ target: { name, value } }) {
    setNumericForm({ ...numericByValueForm, [name]: value });
  }

  useEffect(() => {
    const { filterByNumericValues } = filters;
    let filteringColumns = [...initalColumns];

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        filteringColumns = (filteringColumns.filter((column) => (
          column !== filter.column)));
      });
    }
    setOptionsColumn(filteringColumns);
    setNumericForm({ column: filteringColumns[0], comparison: 'maior que', value: 0 });
  }, [filters]);

  const selectFilter = (htmlFor, testId, value, options) => (
    <label htmlFor={ htmlFor }>
      <select
        name={ htmlFor }
        onChange={ handleFilterByNumericValues }
        data-testid={ testId }
        value={ value }
      >
        { options.map((item) => (<option key={ item } value={ item }>{ item }</option>))}
      </select>
    </label>
  );

  const comparisons = ['maior que', 'menor que', 'igual a'];
  const { column, comparison, value } = numericByValueForm;
  const { filterByNumericValues } = filters;

  return (
    <>
      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            name="name-filter"
            onChange={ handleFilterByName }
            data-testid="name-filter"
          />
        </label>
      </form>
      <form>
        { selectFilter('column', 'column-filter', column, optionsColumn) }
        { selectFilter('comparison', 'comparison-filter', comparison, comparisons) }
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            onChange={ handleFilterByNumericValues }
            data-testid="value-filter"
            value={ value }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => onClickButtonNumericValues(column, comparison, value) }
        >
          Filter
        </button>
        { filterByNumericValues.length > 0 && filterByNumericValues.map((item) => (
          <div data-testid="filter" key={ item.column }>
            <span>{item.column}</span>
            <button
              type="button"
              onClick={ () => removeFromFilterByNumericValue(item) }
            >
              X
            </button>
          </div>
        ))}
      </form>
    </>
  );
}

export default FormFilters;

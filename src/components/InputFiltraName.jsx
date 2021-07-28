import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputFiltraName() {
  const { filters, setfilters } = useContext(PlanetsContext);
  const [state, setstate] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const compares = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const infos = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  function saveInState({ name, value }) {
    setstate({
      ...state,
      [name]: value,
    });
  }

  function addFilter() {
    const { column, comparison, value } = state;
    setfilters(
      {
        ...filters,
        filterByNumericValues: [{
          column,
          comparison,
          value,
        }],
      },
    );
  }

  return (
    <>
      <label htmlFor="filter_name">
        Filtra por Nome:
        <input
          data-testid="name-filter"
          id="filter_name"
          onChange={ ({ target }) => setfilters({
            ...filters,
            filterByName: {
              name: target.value,
            },
          }) }
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => saveInState(target) }
        name="column"
      >
        {infos.map((info, index) => (
          <option key={ index }>
            {info}
          </option>))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ ({ target }) => saveInState(target) }
      >
        {compares.map((comp) => <option key={ comp }>{comp}</option>)}
      </select>

      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ ({ target }) => saveInState(target) }
      />

      <button
        type="button"
        onClick={ addFilter }
        data-testid="button-filter"
      >
        filter
      </button>
    </>
  );
}

export default InputFiltraName;

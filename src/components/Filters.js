import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/Context';

function Filters() {
  const numFil = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const compFil = ['maior que', 'menor que', 'igual a'];
  const [numFill, setnNumFill] = useState(numFil);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const { handleChange, handleClick,
    filters: { filterByNumericValues },
    deleteFilter } = useContext(GlobalContext);
  useEffect(() => {
    const { length } = filterByNumericValues;
    const newNumfil = length > 0 ? numFill
      .filter((selected) => !filterByNumericValues[length - 1].column
        .includes(selected)) : numFill;
    setnNumFill(newNumfil);
  }, [filterByNumericValues]);
  return (
    <div className="filters-sction">
      <label htmlFor="search">
        Search
        <input data-testid="name-filter" id="search" onChange={ handleChange } />
      </label>
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
        name="column"
      >
        {numFill
          .map((field, index) => <option key={ index } value={ field }>{field}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
        name="comparison"
      >
        {compFil
          .map((field, index) => <option key={ index } value={ field }>{field}</option>)}
      </select>
      <label htmlFor="number">
        Number
        <input
          data-testid="value-filter"
          name="value"
          id="number"
          type="number"
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          handleClick({ column, comparison, value });
        } }
      >
        Filter
      </button>
      {filterByNumericValues
        .map((el, index) => (
          <p data-testid="filter" key={ index }>
            {el.column}
            {' '}
            {el.comparison}
            {' '}
            {el.value}
            <button
              type="button"
              value={ el.column }
              onClick={ ({ target }) => deleteFilter(target) }
            >
              X
            </button>
          </p>
        ))}
    </div>
  );
}

export default Filters;

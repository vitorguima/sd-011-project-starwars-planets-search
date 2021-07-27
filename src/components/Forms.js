import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

// OPTIONS TO COMPARISON
const COMPARISON_OPTIONS = ['maior que', 'menor que', 'igual a'];

// OPTIONS TO SORT
const COLUMNS_OPTIONS_TO_SORT = ['name', 'rotation_period', 'orbital_period',
  'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population',
  'films', 'created',
  'edited', 'url'];

function Forms() {
  const {
    filters, setFilters,
    columnsOptions, setColumnsOptions } = useContext(SWContext);
  const { filterByNumericValues } = filters;

  const [column, setColumn] = useState('column');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [columnSort, setColumnSort] = useState('');
  const [sort, setSort] = useState('ASC');

  const myState = { column, comparison, value };

  // SET FILTER INFO
  const handleFilterClick = () => {
    if (column && comparison && value) {
      setFilters({ ...filters,
        filterByNumericValues: [...filterByNumericValues, myState] });
      setColumnsOptions(columnsOptions.filter((option) => option !== column));
      setColumn('column');
      setComparison('comparison');
      setValue('0');
    } else {
      console.log('Incomplete Fields');
    }
  };

  // SET SORT SETTINGS
  const handleSortClick = () => {
    setFilters({ ...filters, order: { column: columnSort, sort } });
  };

  return (
    <form>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => {
            setFilters({ ...filters, filterByName: { name: target.value } });
          } }
        />

      </label>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option value="">Column</option>
          {columnsOptions.map((option, i) => (
            <option key={ i } value={ option }>{option}</option>))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="">Comparion</option>
          {COMPARISON_OPTIONS.map((option, i) => (
            <option key={ i } value={ option }>{option}</option>))}
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          placeholder="Insert Value"
          data-testid="value-filter"
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterClick() }
      >
        Filtrar
      </button>
      <label htmlFor="column-sort">
        <select
          data-testid="column-sort"
          onChange={ (e) => setColumnSort(e.target.value) }
        >
          {COLUMNS_OPTIONS_TO_SORT
            .map((option, i) => (
              <option
                key={ i }
                value={ option }
              >
                {option}
              </option>))}
        </select>
      </label>
      <label htmlFor="radio-sort">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          checked={ sort === 'ASC' }
          onChange={ (e) => setSort(e.target.value) }
        />
        ASC
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          checked={ sort === 'DESC' }
          onChange={ (e) => setSort(e.target.value) }

        />
        DESC
      </label>
      <button
        type="button"
        onClick={ () => handleSortClick() }
        data-testid="column-sort-button"
      >
        Ordernar
      </button>
    </form>
  );
}

export default Forms;

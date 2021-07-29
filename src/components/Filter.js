import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';

function Filter() {
  const {
    setFilters,
    filters,
    applyFilter,
    optionFilter,
    filterByNumbers,
    setFilterByNumbers,
    handleButtonClick,

  } = useContext(SWContext);
  const { filterByName: { name } } = filters;

  function handleChangeFilterByName(target) {
    setFilters((state) => ({ ...state, filterByName: { name: target.value } }));
  }

  function handleFilterByNumber(target) {
    const { name: nome, value } = target;
    setFilterByNumbers((state) => ({
      ...state,
      [nome]: value,
    }));
  }

  function renderFilter() {
    return (filters.filterByNumericValues
      .map((item) => (
        <div key={ item.column }>
          <p>
            {item.column}
            {item.comparsion}
            {item.value}
          </p>
          <button type="button">X</button>
        </div>
      )));
  }

  useEffect(() => {
    applyFilter();
  }, [filters]);

  const { column, comparsion, value } = filterByNumbers;

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="name-filter"
          name="search"
          placeholder="Pesquisar"
          value={ name }
          onChange={ (event) => handleChangeFilterByName(event.target) }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target }) => handleFilterByNumber(target) }
        >
          {optionFilter.map((item, index) => <option key={ index }>{ item }</option>)}
        </select>
      </label>
      <label htmlFor="comparsion-filter">
        <select
          name="comparsion"
          data-testid="comparsion-filter"
          onChange={ ({ target }) => handleFilterByNumber(target) }
          value={ comparsion }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ value }
          onChange={ ({ target }) => handleFilterByNumber(target) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButtonClick }
      >
        Filtrar
      </button>
      {renderFilter()}

    </div>
  );
}

export default Filter;

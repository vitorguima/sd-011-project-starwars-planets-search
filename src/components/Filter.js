import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';

function Filter() {
  const { setFilters, filters, applyFilter } = useContext(SWContext);
  const { filterByName: { name } } = filters;

  function handleChangeFilterByName(target) {
    setFilters({ filterByName: { name: target } });
  }

  useEffect(() => {
    applyFilter();
  }, [filters]);

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="name-filter"
          name="search"
          placeholder="Pesquisar"
          value={ name }
          onChange={ (event) => handleChangeFilterByName(event.target.value) }
        />
      </label>
      {/* <label htmlFor="column-filter">
        <select data-testid="column-filter">
          {}
        </select>
      </label>
      <label htmlFor="comparsion-filter">
        <select data-testid="comparison-filter">
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
          name="value-filter"
        />
      </label>
      <button
      type="button"
      data-testid="button-filter">Filtrar</button> */}

    </div>
  );
}

export default Filter;

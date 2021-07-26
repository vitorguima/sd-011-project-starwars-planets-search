import React, { useContext, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';

export default function Filters() {
  const { filters, setFilterByName, filterByName } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  useEffect(() => {
    filterByName();
  }, [filterByName, name]);

  return (
    <div>
      <label htmlFor="search-input">
        Pesquisa:
        <input
          type="text"
          data-testid="name-filter"
          id="search-input"
          value={ name }
          onChange={ (event) => setFilterByName(event.target.value) }
        />
      </label>
    </div>
  );
}

import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function PlanetsFilter() {
  const { filters, setFilters } = useContext(MainContext);
  return (
    <form>
      <fieldset>
        <legend>Filtrar</legend>
        <label htmlFor="name-filter">
          Nome:
          <input
            id="name-filter"
            data-testid="name-filter"
            placeholder="Tatooine"
            onChange={ ({ target: { value: name } }) => (
              setFilters(({ ...filters, filterByName: { name } }))) }
          />
        </label>
      </fieldset>
    </form>
  );
}

export default PlanetsFilter;

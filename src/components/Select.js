import React, { useContext } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';

function Select() {
  const { filters, setFilters } = useContext(PlanetsContext);
  console.log(filters);

  function handleChangeSelects({ target }) {
    const { value } = target;
    console.log(value);
  }
  return (
    <div>
      Pesquisar:
      <select
        data-testid="name-filter"
        onChange={ handleChangeSelects }
      >
        <option value="Tal">Tal</option>
      </select>

    </div>
  );
}

export default Select;

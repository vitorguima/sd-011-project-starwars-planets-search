import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { setName } = useContext(PlanetsContext);
  return (
    <div>
      <label htmlFor="inputSearch">
        { 'Buscar: ' }
        <input
          placeholder="Digite o nome do Planeta"
          data-testid="name-filter"
          id="inputSearch"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
    </div>
  );
}

export default Form;

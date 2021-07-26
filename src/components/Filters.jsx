import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const Filters = () => {
  const { setFilterByName } = useContext(PlanetsContext);

  return (
    <form>
      <label htmlFor="name-filter">
        Filtre um planeta pelo nome:
        <input
          data-testid="name-filter"
          id="name-filter"
          onChange={ ({ target: { value } }) => setFilterByName(value) }
          placeholder="Digite o nome de um planeta"
          type="text"
        />
      </label>
    </form>
  );
};

export default Filters;

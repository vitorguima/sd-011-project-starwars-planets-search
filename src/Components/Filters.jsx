import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Filters() {
  const { setName } = useContext(StarWarsContext);
  return (
    <div>
      <label htmlFor="filterByName">
        Filtrar por Nome:
        <input
          type="text"
          id="filterByName"
          data-testid="name-filter"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
    </div>
  );
}

export default Filters;

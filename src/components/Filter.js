import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Filter() {
  const { filters, handleChange } = useContext(StarWarsContext);
  const { filterByName } = filters;
  const { name } = filterByName;

  return (
    <div>
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          onChange={ handleChange }
          value={ name }
          type="text"
        />
      </label>
    </div>
  );
}

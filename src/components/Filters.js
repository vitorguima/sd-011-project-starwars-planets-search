import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Numeric from './Numeric';

export default function Filters() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const { filterByName } = filters;

  const handleChange = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
  };

  return (
    <div>
      <label htmlFor="input-filter">
        Filtrar por nome:
        <input
          type="text"
          data-testid="name-filter"
          id="input-filter"
          name="input-filter"
          value={ filterByName.name }
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <Numeric />
    </div>
  );
}

import React, { useContext } from 'react';
import { Planet } from '../context/Planet';

export default function InputFilter() {
  const { setFilters, filters } = useContext(Planet);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setFilters({
          ...filters,
          filterByName: { name: e.target.value } }) }
        placeholder="filtre um país"
      />
    </div>
  );
}

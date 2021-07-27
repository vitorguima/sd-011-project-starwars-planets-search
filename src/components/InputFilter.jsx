import React, { useContext } from 'react';
import { Planet } from '../context/Planet';

export default function InputFilter() {
  const { setFilters } = useContext(Planet);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setFilters({ filterByName: { name: e.target.value } }) }
      />
    </div>
  );
}

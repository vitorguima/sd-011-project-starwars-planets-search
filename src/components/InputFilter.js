import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function InputFilter() {
  const { handleTextFilter } = useContext(StarWarsContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (event) => handleTextFilter(event) }
      />
    </div>
  );
}

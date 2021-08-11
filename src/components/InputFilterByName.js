import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function InputFilterByName() {
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

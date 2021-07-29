import React from 'react';

import { useTable } from '../contexts/TableContext';

export default function Filter() {
  const { textInput, setTextInput } = useTable();
  return (
    <div>
      <input
        type="text"
        onChange={ ({ target: { value } }) => setTextInput(value) }
        value={ textInput }
        data-testid="name-filter"
      />
    </div>
  );
}

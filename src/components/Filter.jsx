import React from 'react';

import { useTable } from '../contexts/TableContext';

export default function Filter() {
  const { textInput, setTextInput } = useTable();
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target: { value } }) => setTextInput(value) }
        value={ textInput }
      />
    </div>
  );
}

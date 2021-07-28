import React from 'react';
import useHookState from '../hooks/useHookState';

export default function TableInput() {
  const { handleType } = useHookState();

  return (
    <div>
      <label htmlFor="name-input">
        Filter by name:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ (e) => handleType(e.target.value) }
        />
      </label>
    </div>
  );
}

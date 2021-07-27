import React from 'react';
import { useGlobalContext } from '../context';

export default function Navbar() {
  const { handleChange, name } = useGlobalContext();
  return (
    <nav>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (e) => handleChange(e) }
          value={ name }
        />
      </form>
    </nav>
  );
}

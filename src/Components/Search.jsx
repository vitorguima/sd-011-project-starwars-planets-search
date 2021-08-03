import React, { useContext } from 'react';
import AppContext from '../Context';

export default function Search() {
  const { setName } = useContext(AppContext);
  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="name"
        onChange={ ({ target }) => setName(target.value) }
      />
    </form>
  );
}

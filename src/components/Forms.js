import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Form() {
  const { setFilters, filters } = useContext(MyContext);
  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ ({ target }) => {
        setFilters({ ...filters, filterByName: { name: target.value } });
      } }
    />
  );
}

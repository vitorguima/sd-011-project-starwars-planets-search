import React, { useContext } from 'react';
import Context from '../context/Context';

function NameFilter() {
  const { filters, setFilters } = useContext(Context);
  const { filterByName: { name } } = filters;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      filterByName: {
        name: e.target.value,
      },
    });
  };

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleChange }
      />
    </section>
  );
}

export default NameFilter;

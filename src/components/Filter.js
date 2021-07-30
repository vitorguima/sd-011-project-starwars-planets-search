import React, { useState, useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

const Filter = () => {
  const [filter, setFilter] = useState('');
  const { data, setFiltered } = useContext(DataContext);

  useEffect(() => {
    const newData = data.filter((planet) => planet.name.includes(filter));
    setFiltered(newData);
  }, [filter]);

  return (
    <label htmlFor="text-input">
      Filtro
      <input
        id="text-input"
        data-testid="name-filter"
        type="text"
        value={ filter }
        // value={ { filter: { filters: { filterByName } } } }
        onChange={ ({ target }) => setFilter(target.value) }
        placeholder="texto buscado"
      />
    </label>
  );
};

export default Filter;

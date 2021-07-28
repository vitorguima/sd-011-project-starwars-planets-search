import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { filters: { filterByName: { name } },
    setFilterByName, setFilters } = useContext(MyContext);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);

  const handleFilterButton = () => {
    const obj = {
      column,
      comparison,
      value,
    };
    setFilters([obj]);
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ ({ target }) => setFilterByName(target.value) }
      />
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(Number(target.value)) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterButton }
      />
    </>
  );
}

export default SearchBar;

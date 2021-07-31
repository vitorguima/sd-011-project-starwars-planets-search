import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { filters: { filterByName: { name }, filterByNumericValues },
    setFilterByName, setFilters } = useContext(MyContext);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
  const optionsColumnInitial = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const optionsColumn = !column ? optionsColumnInitial
    : optionsColumnInitial.filter((resp) => resp !== column);

  const handleFilterButton = () => {
    const stateFilter = {
      column,
      comparison,
      value,
    };

    setFilters([...filterByNumericValues, stateFilter]);
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
        {optionsColumn.map((option, index) => (
          <option key={ index } value={ option }>{option}</option>
        ))}
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

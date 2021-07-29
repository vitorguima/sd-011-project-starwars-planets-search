import React, { useState } from 'react';
import Context from '../context/Context';

const Selectors = () => {
  const { filterName,
    setFilterName, filterName: { filters } } = React.useContext(Context); // Uso o context criado
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior');
  const [value, setValue] = useState(0);

  const handleChange = ({ target }) => {
    const { name } = target;

    if (name === 'column') {
      setColumn(target.value);
    } else if (name === 'comparison') {
      setComparison(target.value);
    } else {
      setValue(target.value);
    }
  };

  function handleClick() {
    setFilterName({ ...filterName,
      filters: {
        filterByName: filters.filterByName,
        filterByNumericValues: [{
          column,
          comparison,
          value,
        }],
      } });
    // console.log('checkFilters', filters)
    // console.log('checkfilterName', filterName)
  }

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleChange }
      >
        <option value="population" name="population">population</option>
        <option value="orbital_period" name="orbital_period">orbital_period</option>
        <option value="diameter" name="diameter">diameter</option>
        <option value="rotation_period" name="rotation_period">rotation_period</option>
        <option value="surface_water" name="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        name="comparison"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        min="0"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ handleChange }
      />

      <button
        type="submit"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </>
  );
};
export default Selectors;

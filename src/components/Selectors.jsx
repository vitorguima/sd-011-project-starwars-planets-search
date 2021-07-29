import React, { useState } from 'react';
import Context from '../context/Context';

const Selectors = () => {
  const { filterName,
    setFilterName, filterName: { filters } } = React.useContext(Context);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior');
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
  // console.log(column);

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
    const filteredColumn = columnOptions.filter((option) => option !== column);
    setColumnOptions(filteredColumn);
    // console.log('checfilteredColumn', columnOptions)
  }

  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleChange }
      >
        {columnOptions.map((option, index) => (
          <option key={ index } value={ option }>
            {option}
          </option>
        ))}
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

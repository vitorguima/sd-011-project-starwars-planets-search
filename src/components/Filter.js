import React, { useContext, createRef } from 'react';
import StarContext from '../context/StarContext';

function Filter() {
  const {
    setFilterByName,
    setFilterByValue,
    filters: { filterByValue },
  } = useContext(StarContext);

  const filterColumn = createRef();
  const filterComparison = createRef();
  const filterValue = createRef();

  const filterList = () => {
    setFilterByValue([
      ...filterByValue,
      {
        column: filterColumn.current.value,
        comparison: filterComparison.current.value,
        value: parseFloat(filterValue.current.value),
      },
    ]);
  };

  return (
    <>
      <label htmlFor="filterByName">
        Name
        <input
          id="filterByName"
          data-testid="name-filter"
          type="text"
          onChange={ ({ target: { value } }) => {
            setFilterByName(value);
          } }
        />
      </label>

      <label htmlFor="filterColumn">
        Column
        <select
          id="filterColumn"
          ref={ filterColumn }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="filterComparison">
        Comparison
        <select
          id="filterComparison"
          ref={ filterComparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="filterValue">
        Value
        <input
          id="filterValue"
          ref={ filterValue }
          data-testid="value-filter"
          type="number"
        />
      </label>
      <button onClick={ filterList } type="button" data-testid="button-filter">
        Search
      </button>
    </>
  );
}

export default Filter;

import React from 'react';
import { useGlobalContext } from '../hooks/Context';

const Filter = () => {
  const {
    // filter,
    // setFilter,
    // options,
    // setOptions,
    handleChange,
    name,
    handleChangeInputs,
    filterComparison,
    handleClick } = useGlobalContext();
  const { column, comparison, value } = filterComparison;

  // function handleClickDelete(cln) {
  //   filterComparison('');
  //   const newFilter = filter.filterByNumericValues.filter((item) => item.column !== cln);
  //   setFilter({ ...filter, filterByNumericValues: newFilter });
  //   setOptions([...options, cln]);
  // }

  return (
    <form>
      <input
        name="name"
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
        value={ name }
      />
      <select
        name="column"
        value={ column }
        onChange={ handleChangeInputs }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        value={ comparison }
        onChange={ handleChangeInputs }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        value={ value }
        onChange={ handleChangeInputs }
        type="number"
        data-testid="value-filter"
      />
      <button type="button" onClick={ handleClick } data-testid="button-filter">
        Filter
      </button>
      {/* {filter.filterByNumericValues && filter.filterByNumericValues.map((filters, i) => (
        <div key={ i } data-testid="filter">
          <p>{filter.column}</p>
          <button
            type="button"
            onClick={ () => handleClickDelete(filter.column) }
          >
            X
          </button>
        </div>
      ))} */}
    </form>
  );
};

export default Filter;

import React, { useContext } from 'react';
import starWarsContext from '../myContext/StarWarsContext';

function FilterByNumbers() {
  const {
    initialFilters,
    setNumericFilters, filterNumbers, setFilterNumbers } = useContext(starWarsContext);
  const { filterByNumericValues } = initialFilters;

  const handleChange = ({ target: { name, value } }) => {
    setFilterNumbers({
      ...filterNumbers, [name]: value });
  };

  let options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  if (filterByNumericValues.length > 0) {
    options = options.filter((option) => !filterByNumericValues
      .map(({ column }) => column).includes(option));
  }
  const { column, comparison, value } = filterNumbers;

  return (
    <form>
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          id="column-filter"
          name="column"
          value={ column }
          onChange={ handleChange }
        >
          { options.map((option) => <option key={ option }>{ option }</option>) }
        </select>
      </label>

      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="name-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ value }
          onChange={ handleChange }
        />
      </label>
      <button
        onClick={ () => { setNumericFilters(filterNumbers); } }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterByNumbers;

import React, { useContext } from 'react';
import StarwarsPlanetsContext from '../context/StarwarsPlanetsContext';

function Filters() {
  const { setFilters } = useContext(StarwarsPlanetsContext);

  const handleChange = ({ target }) => {
    setFilters({
      filters: {
        filterByName: {
          name: target.value,
        },
      },
    });
  };

  // const handleClick = (event) => {

  // };

  return (
    <section>
      <div>
        <label htmlFor="filter-by-letter">
          <input
            type="text"
            id="filter-by-letter"
            data-testid="name-filter"
            onChange={ (e) => handleChange(e) }
          />
        </label>
      </div>
      <div>
        <select data-testid="column-filter">
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <select data-testid="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <label htmlFor="numeric-filter">
          <input type="number" data-testid="value-filter" id="numeric-filter" />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {} }
        >
          Filter
        </button>
      </div>
    </section>
  );
}

export default Filters;

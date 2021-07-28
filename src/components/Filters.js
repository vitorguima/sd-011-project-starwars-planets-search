import React from 'react';
// import StarwarsPlanetsContext from '../context/StarwarsPlanetsContext';

function Filters() {
  // const { handleChange } = useContext(StarwarsPlanetsContext);
  return (
    <section>
      <form>
        <label htmlFor="filter-by-letter">
          <input
            type="text"
            id="filter-by-letter"
            data-testid="name-filter"
            onChange={ () => {} }
          />
        </label>
      </form>
    </section>
  );
}

export default Filters;

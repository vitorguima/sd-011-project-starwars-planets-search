import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Head() {
  const { filterByName } = useContext(PlanetsContext);
  const handleChange = ({ target }) => {
    filterByName(target.value);
  };

  return (
    <>
      <input
        data-testid="name-filter"
        placeholder="Filtering by name"
        type="text"
        onChange={ handleChange }
      />
      <section>
        <selection>
          <option>1</option>
        </selection>
      </section>
    </>
  );
}

export default Head;

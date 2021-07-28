import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Head() {
  const { filterByName } = useContext(PlanetsContext);
  const handleChange = ({ target }) => {
    filterByName(target.value);
  };

  return (
    <input
      placeholder="Filtering by name"
      type="text"
      onChange={ handleChange }
    />
  );
}

export default Head;

import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchInput() {
  const [handleSearcher, setHandleSearcher] = useState('');
  const { setPlanets, planetsFromApi } = useContext(PlanetsContext);

  function handleSearchingWhileFiltering({ target }) {
    setHandleSearcher(target.value);
    const filteredPlanets = planetsFromApi.filter(
      (planet) => planet.name.includes(target.value),
    );
    setPlanets(filteredPlanets);
  }

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ (event) => handleSearchingWhileFiltering(event) }
      value={ handleSearcher }
      placeholder="Search your planet..."
    />
  );
}

export default SearchInput;

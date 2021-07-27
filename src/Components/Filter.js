import React, { useContext } from 'react';
import PlanetsContext from '../Contexts/PlanetsContext';

function Filter() {
  const { name, setName, setFiltered, data } = useContext(PlanetsContext);

  const filterByName = ({ target }) => {
    setName(target.value);

    const filteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));

    setFiltered(filteredPlanets);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ filterByName }
      />
    </div>
  );
}

export default Filter;

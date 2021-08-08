import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function PlanetsFilter() {
  const { data, setFilteredData } = useContext(MainContext);

  function handleFormChange(value) {
    const newData = data.filter((planet) => {
      if (planet.name.includes(value)) return true;
      return false;
    });
    setFilteredData(newData);
  }

  return (
    <form>
      <fieldset>
        <legend>Filtrar</legend>
        <label htmlFor="name-filter">
          Nome:
          <input
            id="name-filter"
            data-testid="name-filter"
            placeholder="Tatooine"
            onChange={ ({ target: { value } }) => handleFormChange(value) }
          />
        </label>
      </fieldset>
    </form>
  );
}

export default PlanetsFilter;

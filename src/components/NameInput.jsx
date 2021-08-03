import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NameInput() {
  const { handleInputPlanet } = useContext(PlanetsContext);
  return (
    <label htmlFor="input-planets">
      <input
        onChange={ handleInputPlanet() }
        data-testid="name-filter"
        placeholder="Filter by name"
      />
    </label>
  );
}

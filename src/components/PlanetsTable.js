import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetsTable() {
  const { filteredPlanets } = useContext(StarWarsContext);
  const planetLine = (planet) => {
    const {
      name,
      rotation_period: rotationalPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      terrain,
      gravity,
      surface_water: surfaceWater,
      population,
      residents,
      films,
      created,
      edited,
    } = planet;
    return (
      <tr key={ name }>
        <td data-testid="planet-name">{name}</td>
        <td>{rotationalPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{terrain}</td>
        <td>{gravity}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>
          {residents.map((resident) => <a key={ resident } href={ resident }>Link</a>)}
        </td>
        <td>{films.map((film) => <a key={ film } href={ film }>Link</a>)}</td>
        <td>{created}</td>
        <td>{edited}</td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotational Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Terrain</th>
          <th>Gravity</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Residents</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.length > 0 && filteredPlanets.map((planet) => (
          planetLine(planet)))}
      </tbody>
    </table>
  );
}

export default PlanetsTable;

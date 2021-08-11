import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { theRender } = useContext(PlanetsContext);

  const header = ['Name', 'Rotation', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  console.log(theRender);
  return (
    <table>
      <thead>
        <tr className="tableHead">
          {header.map((h, i) => <th key={ i }>{ h }</th>)}
        </tr>
      </thead>
      <tbody>
        {theRender.map((planet, i) => (
          <tr key={ i } className="tableBody">
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            {/* {console.log(planet)} */}
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films[0]}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

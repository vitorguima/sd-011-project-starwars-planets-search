import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const tableHeader = ['Name', 'Rotation', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'Url'];

function Table() {
  const { planets } = useContext(PlanetsContext);

  return (
    <table>
      <tr>
        { tableHeader.map((title, index) => <th key={ index }>{ title }</th>) }
      </tr>
      {planets.map((planet, index) => (
        <tr key={ index }>
          <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films[0] }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td>
        </tr>
      ))}
    </table>
  );
}

export default Table;
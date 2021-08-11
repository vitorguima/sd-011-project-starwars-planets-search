import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { theRender, order } = useContext(PlanetsContext);

  const header = ['Name', 'Rotation', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  let filtereds;
  const magicNumber = -1;
  if (order.sort === 'asc' && (order.column === 'name')) {
    filtereds = theRender
      .sort((a, b) => ((a[order.column] > b[order.column]) ? 1 : magicNumber));
  } else if (order.sort === 'desc' && (order.column === 'name')) {
    filtereds = theRender
      .sort((a, b) => ((a[order.column] < b[order.column]) ? 1 : magicNumber));
  } else if (order.sort === 'asc' && (order.column !== 'name')) {
    filtereds = theRender
      .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
  } else if (order.sort === 'desc' && (order.column !== 'name')) {
    filtereds = theRender
      .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
  }

  return (
    <table>
      <thead>
        <tr className="tableHead">
          {header.map((h, i) => <th key={ i }>{ h }</th>)}
        </tr>
      </thead>
      <tbody>
        {filtereds.map((planet, i) => (
          <tr key={ i } className="tableBody">
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
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

import React, { useContext } from 'react';
import planetsContext from '../provider/planetsContext';

function Table() {
  const { planets } = useContext(planetsContext);
  console.log(planets);
  if (planets === undefined) {
    return (
      <h3>loading...</h3>
    );
  }
  const keys = (Object.keys(planets.results[0])).filter((key) => key !== 'residents');
  return (
    <table className="tabela">
      <tr>
        {keys.map((key) => <th key={ key }>{key}</th>)}
      </tr>
      {
        planets.results.map((planet, index) => (
          <tr key={ index }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))
      }
    </table>
  );
}

export default Table;

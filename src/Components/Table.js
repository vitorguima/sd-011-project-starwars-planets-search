import React, { useContext } from 'react';
import PlanetsContext from '../Contexts/PlanetsContext';

function Table() {
  const { filtered } = useContext(PlanetsContext);

  const headers = () => {
    if (filtered.length > 0) {
      return (
        <thead>
          <tr>
            {
              filtered.map((planet) => Object.keys(planet))[0]
                .filter((keys) => keys !== 'residents')
                .map((key, index) => <th key={ index }>{key}</th>)
            }
          </tr>
        </thead>

      );
    }
  };

  const cells = () => {
    if (filtered.length > 0) {
      return (
        <tbody>
          {
            filtered.map((planet, index) => (
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
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      );
    }
  };

  return (
    <table>
      {headers()}
      {cells()}
    </table>
  );
}

export default Table;

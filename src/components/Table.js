import React, { Fragment, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import TableHeader from './TableHeader';

function Table() {
  const { filteredPlanets } = useContext(PlanetContext);

  return (
    <table>
      <TableHeader />
      <tbody>
        {
          filteredPlanets.map((planet, index) => {
            let planetRow = <Fragment key={ index } />;
            planetRow = (
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
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            );
            return planetRow;
          })
        }
      </tbody>
    </table>
  );
}

export default Table;

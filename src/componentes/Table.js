import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets } = useContext(StarContext);

  useEffect(() => {
    
  },[])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        { planets.map((planet) => (
          <tbody key={planet.name}>
            <tr>
              <td>planet.name</td>
              <td>planet.Rotation_period</td>
              <td>planet.Orbital_period</td>
              <td>planet.Diameter</td>
              <td>planet.Climate</td>
              <td>planet.Gravity</td>
              <td>planet.Terrain</td>
              <td>planet.Surface_water</td>
              <td>planet.Population</td>
              <td>planet.Films</td>
              <td>planet.Created</td>
              <td>planet.Edited</td>
              <td>planet.Url</td>
            </tr>
          </tbody>
        )) }
      </table>
    </div>
  );
}

export default Table;

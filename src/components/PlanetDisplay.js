import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

function PlanetDisplay() {
  const { data } = useContext(SWContext);

  // console.log(data);
  // console.log(SWContext);
  if (!data.length) {
    return <h1>Loading...</h1>;
  }
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Climate</th>
        <th>Created</th>
        <th>Diameter</th>
        <th>Edited</th>
        <th>Films</th>
        <th>Gravity</th>
        <th>Orbital_period</th>
        <th>Population</th>
        <th>Rotation_period</th>
        <th>Surface_water</th>
        <th>Terrain</th>
        <th>Url</th>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={ item }>
            <td>{item.name}</td>
            <td>{item.cliamte}</td>
            <td>{item.created}</td>
            <td>{item.diameter}</td>
            <td>{item.edited}</td>
            <td>{item.films}</td>
            <td>{item.gravity}</td>
            <td>{item.orbital_period}</td>
            <td>{item.population}</td>
            <td>{item.rotation_period}</td>
            <td>{item.surface_water}</td>
            <td>{item.terrain}</td>
            <td>{item.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlanetDisplay;

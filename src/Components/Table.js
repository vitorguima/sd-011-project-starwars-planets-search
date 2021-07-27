import React, { useContext } from 'react';
import context from '../Context';

function Table() {
  const { data } = useContext(context);
  console.log(data);
  return (
    <table>
      <tr>
        <th>name</th>
        <th>climated</th>
        <th>diameter</th>
        <th>edited</th>
        <th>gravity</th>
        <th>orbital-period</th>
        <th>population</th>
        <th>rotation-period</th>
        <th>surface-water</th>
        <th>terrain</th>
        <th>url</th>
        <th>films</th>
        <th>created</th>
      </tr>

      { data.map((iten, index) => (
        <tr key={ index }>
          <td>{iten.name}</td>
          <td>{iten.climate}</td>
          <td>{iten.diameter}</td>
          <td>{iten.edited}</td>
          <td>
            {iten.gravity}
          </td>
          <td>
            {iten.orbital_period}
          </td>
          <td>
            {iten.population}
          </td>
          <td>
            {iten.rotation_period}
          </td>
          <td>
            {iten.surface_water}
          </td>
          <td>
            {iten.terrain}
          </td>
          <td>
            {iten.url}
          </td>
          <td>
            {iten.films}
          </td>
          <td>
            {iten.created}
          </td>
        </tr>
      ))}
    </table>

  );
}

export default Table;

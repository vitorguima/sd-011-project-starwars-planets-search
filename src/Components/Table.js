import React, { useContext } from 'react';
import context from '../Context';

function Table() {
  const { data } = useContext(context);
  console.log(data);
  return (
    <table>
      <thead>
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
      </thead>
      <tbody>
        { data.map((item) => (
          <tr key={ item.name }>
            <td>{item.name}</td>
            <td>{item.climate}</td>
            <td>{item.diameter}</td>
            <td>{item.edited}</td>
            <td>{item.gravity}</td>
            <td>{item.orbital_period}</td>
            <td>{item.population}</td>
            <td>{item.rotation_period}</td>
            <td>{item.surface_water}</td>
            <td>{item.terrain}</td>
            <td>{item.url}</td>
            <td>{item.films}</td>
            <td>{item.created}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}

export default Table;

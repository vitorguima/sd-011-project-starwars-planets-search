import React, { useContext } from 'react';
import AppContext from './Context';

function Table() {
  const { filterData } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation</th>
          <th>Orbital</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface-Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        { filterData.map((dados) => (
          <tr key={ dados.name }>
            <td>{dados.name}</td>
            <td>{dados.rotation_period}</td>
            <td>{dados.orbital_period}</td>
            <td>{dados.diameter}</td>
            <td>{dados.climate}</td>
            <td>{dados.gravity}</td>
            <td>{dados.terrain}</td>
            <td>{dados.surface_water}</td>
            <td>{dados.population}</td>
            <td>{dados.films}</td>
            <td>{dados.created}</td>
            <td>{dados.edited}</td>
            <td>{dados.url}</td>
          </tr>)).filter((valor) => valor !== 'residents') }
      </tbody>
    </table>
  );
}

export default Table;

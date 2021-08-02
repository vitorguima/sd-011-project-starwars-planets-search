import React, { useContext } from 'react';
import starWarsContex from '../context/starWarsContex';

export default function Table() {
  const data = useContext(starWarsContex);
  return (
    <table>
      <thead>
        <tr>
          <th>climate</th>
          <th>created</th>
          <th>diameter</th>
          <th>edited</th>
          <th>films</th>
          <th>gravity</th>
          <th>name</th>
          <th>orbital_period</th>
          <th>population</th>
          <th>rotation_period</th>
          <th>surgace_water</th>
          <th>______________</th>
        </tr>
      </thead>
      {data.map((planet, index) => (
        <tbody key={ index }>
          <tr key={ index }>
            <td>{ planet.climate }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.films.map((film, i) => (<p key={ i }>{ film }</p>))}</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.name }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.population }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.surgace_water }</td>
            <td>{ planet.terrain }</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import './Table.css';

function Table() {
  const { data } = useContext(PlanetsContext);
  return (
    <table id="table">
      <tr id="head">
        <th>name</th>
        <th>rotation_period</th>
        <th>orbital_period</th>
        <th>diameter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface_water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>url</th>
      </tr>
      <tr id="body">
        {data && (
          data.map((planet, index) => (
            <div key={ index } id="block">
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.population}</td>
              <div id="list">
                {planet.films
                  .map((film, numberKey) => <td key={ numberKey }>{film}</td>)}
              </div>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </div>
          )))}
      </tr>
    </table>
  );
}

export default Table;

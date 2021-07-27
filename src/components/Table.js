import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';
import '../css/Table.css';

function Table() {
  const { data, searchName } = useContext(planetsContext);
  const { filterByName } = searchName;
  const { name } = filterByName;
  let results = [];
  if (name) {
    results = data.filter((planetName) => planetName
      .name.toLowerCase()
      .includes(name.toLowerCase()));
  } else {
    results = data;
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Rotation period</th>
        <th>Orbital period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
      {results.map((item) => (
        <tr key={ item.name }>
          <td>{ item.name }</td>
          <td>{ item.rotation_period }</td>
          <td>{ item.orbital_period }</td>
          <td>{ item.diameter }</td>
          <td>{ item.climate }</td>
          <td>{ item.gravity }</td>
          <td>{ item.terrain }</td>
          <td>{ item.surface_water }</td>
          <td>{ item.population }</td>
          <td>{ item.films.reduce((sum, film) => `${sum}, ${film}`) }</td>
          <td>{ item.created }</td>
          <td>{ item.edited }</td>
          <td>{ item.url }</td>
        </tr>
      ))}
    </table>
  );
}

export default Table;

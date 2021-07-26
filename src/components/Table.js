import React, { useContext } from 'react';

import Context from '../context/Context';

export default function Table() {
  const { data, filters: {
    filterByName: { name: nameFilter },
  } } = useContext(Context);
  let planets = data;
  if (nameFilter.trim() !== '') {
    planets = data.filter(({ name }) => name.includes(nameFilter));
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation</th>
          <th>Orbit period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {
          planets.map(({
            name,
            rotation_period: rotation,
            orbital_period: orbit,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: water,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ url }>
              <td>{name}</td>
              <td>{rotation}</td>
              <td>{orbit}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{water}</td>
              <td>{population}</td>
              <td>{films.join(', ')}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>))
        }
      </tbody>
    </table>
  );
}

import React, { useContext } from 'react';
import Context from '../context/Context';
import mySort from '../services/mySort';

export default function Table() {
  const {
    data,
    filteredData,
    filters: {
      filterByName: { name: nameFilter },
      order,
    },
  } = useContext(Context);

  let planets;
  if (filteredData.length === 0) planets = data;
  else planets = filteredData;
  if (nameFilter.trim() !== '') {
    planets = planets.filter(({ name }) => name.includes(nameFilter));
  }

  planets = mySort(planets, order);

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
        { planets.map(({
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
            <td data-testid="planet-name">{name}</td>
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
          </tr>)) }
      </tbody>
    </table>
  );
}

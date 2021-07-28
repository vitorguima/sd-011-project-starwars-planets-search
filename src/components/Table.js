import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { planets, filters } = useContext(Context);
  const { filterByName: { name }, filterByNumericValues } = filters;

  const array = planets.filter((planet) => {
    const { column, comparison, value } = filterByNumericValues[0];
    const searchName = planet.name.toLowerCase().includes(name.toLowerCase());
    switch (comparison) {
    case 'maior que':
      return parseInt(planet[column], 10) > parseInt(value, 10) && searchName;
    case 'menor que':
      return parseInt(planet[column], 10) < parseInt(value, 10) && searchName;
    case 'igual a':
      return parseInt(planet[column], 10) === parseInt(value, 10) && searchName;
    default:
      return searchName;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {array.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

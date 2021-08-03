import React, { useContext } from 'react';
import AppContext from '../Context';

export default function Table() {
  const { list } = useContext(AppContext);
  return (list) ? (
    <table>
      <tr>
        <th>Planet</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
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
      {
        list.map((element, index) => (
          <tr key={ index }>
            <td>{ element.name }</td>
            <td>{ element.rotation_period }</td>
            <td>{ element.orbital_period }</td>
            <td>{ element.diameter }</td>
            <td>{ element.climate }</td>
            <td>{ element.gravity }</td>
            <td>{ element.terrain }</td>
            <td>{ element.surface_water }</td>
            <td>{ element.population }</td>
            <td>{ element.films }</td>
            <td>{ element.created }</td>
            <td>{ element.edited }</td>
            <td>
              <a
                href={ element.url }
                rel="noopener noreferrer"
                target="_blank"
              >
                { element.url }
              </a>
            </td>
          </tr>
        ))
      }
    </table>
  ) : <p>Loading ...</p>;
}

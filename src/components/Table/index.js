import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Table() {
  const { data, filters } = useContext(PlanetsContext);

  const REG_EXP_TO_BY_FILTER_NAME = new RegExp(filters.filterByName.name, 'gi');
  const filteredPlanets = data.filter(
    (planet) => planet.name.match(REG_EXP_TO_BY_FILTER_NAME),
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name:</th>
          <th>Climate:</th>
          <th>CreatedAt:</th>
          <th>Diameter:</th>
          <th>Edited:</th>
          <th>Films:</th>
          <th>Gravity:</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water:</th>
          <th>Terrain</th>
          <th>Url:</th>
        </tr>
      </thead>
      <tbody>
        {
          (
            filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.created }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.filmes }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.population }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          )
        }
      </tbody>
    </table>
  );
}

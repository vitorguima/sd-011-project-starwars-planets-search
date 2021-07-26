import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContex';

function Table() {
  const { data, filters } = useContext(PlanetContext);
  const { filterByName } = filters;
  const { name } = filterByName;
  console.log(data[1]);

  const search = !name ? data
    : data.filter((planet) => planet.name.toLowerCase()
      .includes(name.toLocaleLowerCase()));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rottion Period</th>
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
        { data.length && search.map((planet) => (
          <tbody key={ planet.name }>
            <tr>
              <th>{ planet.name }</th>
              <th>{ planet.rotation_period }</th>
              <th>{ planet.orbital_period }</th>
              <th>{ planet.diameter }</th>
              <th>{ planet.climate }</th>
              <th>{ planet.gravity }</th>
              <th>{ planet.terrain }</th>
              <th>{ planet.surface_water }</th>
              <th>{ planet.population }</th>
              <th>{ planet.films }</th>
              <th>{ planet.created }</th>
              <th>{ planet.edited }</th>
              <th>{ planet.url }</th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Table;

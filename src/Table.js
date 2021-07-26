import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContex';

function Table() {
  const { data, filters } = useContext(PlanetContext);
  const { filterByName } = filters;
  const { name } = filterByName;
  // const { column, comparison, value } = filterByNumericValues;

  const search = !name ? data : data.filter((planet) => planet.name.toLowerCase()
    .includes(name.toLocaleLowerCase()));
    // }
    // if (column && comparison === 'maior que') {
    //   return column > value;
    // }
    // if (column && comparison === 'menor que') {
    //   return column < value;
    // }
    // if (column && comparison === 'igual a') {
    //   return column === value;

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
            <th>Residents</th>
          </tr>
        </thead>
        <tbody>
          { data.length && search.map((planet) => (
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
              <td>{ planet.residents }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

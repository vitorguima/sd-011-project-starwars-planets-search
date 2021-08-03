import React, { useContext } from 'react';
import APIContext from '../Context/APIContext';

function Table() {
  const { filteredPlanets, filters, searchFilters } = useContext(APIContext);

  function filterDataPlanets() {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length > 0) {
      const { column, comparison, value } = searchFilters;
      let newFilteredPlanets = [];
      switch (comparison) {
      case 'menor que':
        newFilteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) < Number(value));
        break;
      case 'maior que':
        newFilteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) > Number(value));
        break;
      case 'igual a':
        newFilteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) === Number(value));
        break;
      default:
        return filteredPlanets;
      }
      return newFilteredPlanets;
    }
    return filteredPlanets;
  }
  return (
    <div>
      <table className="table-planets">
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
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { filterDataPlanets().map((planet) => (
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
    </div>
  );
}

export default Table;

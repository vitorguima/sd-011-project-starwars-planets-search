import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContex';

function Table() {
  const { data, filters } = useContext(PlanetContext);
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;

  const search = (!name) ? data : data.filter((planet) => planet
    .name.toLowerCase().includes(name.toLocaleLowerCase()));

  const condition = () => {
    const newArray = search.filter((element) => {
      let trueOrFalse = true;
      filterByNumericValues.forEach(({ comparison, value, column }) => {
        switch (comparison) {
        case 'maior que':
          trueOrFalse = trueOrFalse && Number(element[column]) > Number(value);
          break;
        case 'menor que':
          trueOrFalse = trueOrFalse && Number(element[column]) < Number(value);
          break;
        case 'igual a':
          trueOrFalse = trueOrFalse && Number(element[column]) === Number(value);
          break;
        default:
          trueOrFalse = false;
          break;
        }
      });
      return trueOrFalse;
    });
    return newArray;
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Rottion Period</th>
            <th className="table-header">Orbital Period</th>
            <th className="table-header">Diameter</th>
            <th className="table-header">Climate</th>
            <th className="table-header">Gravity</th>
            <th className="table-header">Terrain</th>
            <th className="table-header">Surface Water</th>
            <th className="table-header">Population</th>
            <th className="table-header">Films</th>
            <th className="table-header">Created</th>
            <th className="table-header">Edited</th>
            <th className="residents">Residents</th>
          </tr>
        </thead>
        <tbody>
          { condition().map((planet) => (
            <tr key={ planet.name }>
              <td className="table-lines-name table-lines">{ planet.name }</td>
              <td className="table-lines table-lines">{ planet.rotation_period }</td>
              <td className="table-lines table-lines">{ planet.orbital_period }</td>
              <td className="table-lines table-lines">{ planet.diameter }</td>
              <td className="table-lines table-lines">{ planet.climate }</td>
              <td className="table-lines table-lines">{ planet.gravity }</td>
              <td className="table-lines table-lines">{ planet.terrain }</td>
              <td className="table-lines table-lines">{ planet.surface_water }</td>
              <td className="table-lines table-lines">{ planet.population }</td>
              <td className="table-lines table-lines">{ planet.films }</td>
              <td className="table-lines table-lines">{ planet.created }</td>
              <td className="table-lines table-lines">{ planet.edited }</td>
              <td className="residents">{ planet.residents }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

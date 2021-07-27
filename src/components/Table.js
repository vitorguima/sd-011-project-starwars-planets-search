import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    data,
    dataFilters: {
      filters:
        {
          filterByName: {
            name,
          },
          filterByNumericValues: [
            {
              column,
              comparison,
              value,
            },
          ],
        },
    },
  } = useContext(Context);

  let filteredPlanets = [];
  if (name) {
    filteredPlanets = data.filter((planet) => planet.name.toLowerCase().includes(name));
  } else {
    filteredPlanets = data;
  }

  let numericFilter = [];
  if (column && comparison && value) {
   // switch case
  }

  return (
    <div>
      {filteredPlanets.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(filteredPlanets[0]).map((header, index) => (
                <th key={ index }>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Table;

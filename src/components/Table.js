import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, dataFilters: { filters } } = useContext(Context);
  const { filterByName, filterByNumericValues } = filters;
  //  const { column, comparison, value } = filterByNumericValues[0];

  let filteredPlanets = [];
  if (filterByName.name) {
    filteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(filterByName.name)));
  } else {
    filteredPlanets = data;
  }

  filterByNumericValues.forEach((e) => {
    const { column, comparison, value } = e;
    if (comparison === 'maior que') {
      filteredPlanets = filteredPlanets.filter((planet) => (
        Number(planet[column]) > Number(value)
      ));
    }
    if (comparison === 'menor que') {
      filteredPlanets = filteredPlanets.filter((planet) => (
        Number(planet[column]) < Number(value)
      ));
    }
    if (comparison === 'igual a') {
      filteredPlanets = filteredPlanets.filter((planet) => (
        Number(planet[column]) === Number(value)
      ));
    }
  });

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

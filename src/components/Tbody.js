import React, { useContext } from 'react';
import FilmsUl from './FilmsUl';
import SWContext from '../context/SWContext';

// MAGIC NUMBERS
const NEGATIVE_ONE = -1;

// VERIFY IF COLUMN TYPE IS NUMBER
const isColumnTypeNumber = (column) => {
  switch (true) {
  case column === 'rotation_period':
    return true;

  case column === 'orbital_period':
    return true;

  case column === 'diameter':
    return true;

  case column === 'surface_water':
    return true;

  case column === 'population':
    return true;

  default:
    return false;
  }
};

// RETURN PLANETS AFTER FILTER AND SORT
const FilterPlanets = (data, filters) => {
  let planetsToReturn = [...data];
  const { filterByName, filterByNumericValues, order } = filters;

  // QUERY PLANETS BY NAME
  planetsToReturn = planetsToReturn
    .filter(({ name }) => name.toLowerCase()
      .includes((filterByName.name).toLowerCase()));

  // FILTER PLANETS ACCORDING TO FILTERS SETTINGS
  filterByNumericValues.forEach(({ column, comparison, value }) => {
    switch (true) {
    case comparison === 'maior que':
      planetsToReturn = planetsToReturn
        .filter((planets) => Number(planets[column]) > Number(value));
      break;
    case comparison === 'menor que':
      planetsToReturn = planetsToReturn
        .filter((planets) => Number(planets[column]) < Number(value));
      break;
    case comparison === 'igual a':
      planetsToReturn = planetsToReturn
        .filter((planets) => Number(planets[column]) === Number(value));
      break;

    default:
      break;
    }
  });

  // SORT PLANETS ACCORDING TO SORT SETTINGS
  switch (true) {
  case order.sort === 'ASC' && !isColumnTypeNumber(order.column):
    planetsToReturn = [...planetsToReturn]
      .sort((a, b) => ((a[order.column] > b[order.column]) ? 1 : NEGATIVE_ONE));
    return planetsToReturn;
  case order.sort === 'DESC' && !isColumnTypeNumber(order.column):
    planetsToReturn = [...planetsToReturn]
      .sort((a, b) => ((a[order.column] < b[order.column]) ? 1 : NEGATIVE_ONE));
    return planetsToReturn;
  case order.sort === 'ASC' && isColumnTypeNumber(order.column):
    planetsToReturn = [...planetsToReturn]
      .sort((a, b) => (Number(a[order.column]) - Number(b[order.column])));
    return planetsToReturn;
  case order.sort === 'DESC' && isColumnTypeNumber(order.column):
    planetsToReturn = [...planetsToReturn]
      .sort((a, b) => (Number(b[order.column]) - Number(a[order.column])));
    return planetsToReturn;
  default:
    break;
  }
};

function Tbody() {
  const { filters, data } = useContext(SWContext);
  return (
    <tbody>
      {FilterPlanets(data, filters).map((planet, i) => (
        <tr key={ i }>
          <td data-testid="planet-name">{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td><FilmsUl urls={ planet.films } /></td>
          {/* <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td> */}
        </tr>
      ))}
    </tbody>
  );
}

export default Tbody;

import React, { useContext } from 'react';
import AppContext from '../context/context';

function Table() {
  const { data, tableHeader, filters, setOrder } = useContext(AppContext);
  const { results } = data;

  const tablePlanets = () => (
    <tr>
      {tableHeader.map((title) => <th key={ title }>{ title }</th>)}
    </tr>
  );

  const planetFilter = () => {
    let planetFiltered = results
      .filter((planet) => planet.name.toLowerCase().includes(filters.filterByName.name));
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        switch (comparison) {
        case 'maior que':
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) > +(value));
          break;
        case 'menor que':
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) < +(value));
          break;
        default:
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) === +(value));
        }
      });
    }
    return setOrder(planetFiltered, filters.order.column, filters.order.sort);
  };

  const renderTablePlanets2 = () => (
    <tbody>
      {planetFilter().map((planet) => (
        <tr key={ planet.name }>
          <td data-testid="planet-name">{planet.name}</td>
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
        </tr>))}
    </tbody>
  );

  if (!data.results) {
    return <p>Loading...</p>;
  }
  return (
    <table>
      <thead>
        {tablePlanets()}
      </thead>
      {renderTablePlanets2()}
    </table>
  );
}

export default Table;

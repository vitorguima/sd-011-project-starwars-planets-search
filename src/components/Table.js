import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  // estado global
  const {
    data,
    loading,
    filters,
  } = useContext(PlanetsContext);

  // funcoes
  const planetsContent = () => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    let planets = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
        switch (comparison) {
        case 'maior que':
          planets = planets.filter((planet) => +(planet[column]) > +(value));
          break;
        case 'igual a':
          planets = planets.filter((planet) => +(planet[column]) === +(value));
          break;
        case 'menor que':
          planets = planets.filter((planet) => +(planet[column]) < +(value));
          break;
        default:
          break;
        }
      });
    }

    return planets;
  };

  // render
  if (loading) return <h2>Loading...</h2>;

  const headers = Object.keys(data[0]);
  const planets = planetsContent();
  return (
    <table>
      <thead>
        <tr>
          { headers.map((header, index) => <th key={ index }>{ header }</th>) }
        </tr>
      </thead>
      <tbody>
        { planets.map((planet) => (
          <tr key={ planet.name }>
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
        )) }
      </tbody>
    </table>
  );
}

export default Table;

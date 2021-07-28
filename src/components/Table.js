import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { filters, filteredPlanets } = useContext(StarWarsContext);
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;

  const filterName = (!name) ? filteredPlanets : filteredPlanets
    .filter((planet) => planet.name.toLowerCase()
      .includes(name.toLowerCase()));

  const filtersCombination = () => {
    const newFilter = filterName.filter((element) => {
      let condition = true;
      filterByNumericValues.forEach(({ comparison, value, column }) => {
        switch (comparison) {
        case 'maior que':
          condition = condition && (Number(element[column]) > Number(value));
          break;
        case 'menor que':
          condition = condition && (Number(element[column]) < Number(value));
          break;
        case 'igual a':
          condition = condition && (Number(element[column]) === Number(value));
          break;
        default:
          condition = false;
          break;
        }
      });
      return condition;
    });
    return newFilter;
  };

  return (
    <table>
      <caption>Planets</caption>
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
          <th>Residents</th>
        </tr>
      </thead>
      <tbody>
        { filtersCombination().map((planet) => (
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
  );
}

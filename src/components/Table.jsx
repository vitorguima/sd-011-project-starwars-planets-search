import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { planets, filters: { filterByName,
    filterByNumericValues } } = useContext(MyContext);
  const dataPlanet = filterByName.name
    ? planets.filter((planet) => planet.name.includes(filterByName.name)) : planets;

  const defaultFilterByNumericValues = {
    column: '',
    comparison: '',
    value: 0,
  };

  const selectedFilter = filterByNumericValues.length
    ? filterByNumericValues[filterByNumericValues.length - 1]
    : defaultFilterByNumericValues;

  const { column, comparison, value } = selectedFilter;

  const handleFilters = dataPlanet.filter((planet) => {
    switch (comparison) {
    case 'maior que':
      return planet[column] > value;
    case 'igual a':
      return planet[column] === value;
    case 'menor que':
      return planet[column] < value;
    default:
      return true;
    }
  });
  return (
    <table>
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
        { handleFilters.map(({ name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate, gravity, terrain, population,
          surface_water: surfaceWater, films,
          created, edited, url }, index) => (
          <tr key={ index }>
            <td>{name}</td>
            <td>{rotationPeriod}</td>
            <td>{orbitalPeriod}</td>
            <td>{diameter}</td>
            <td>{climate}</td>
            <td>{gravity}</td>
            <td>{terrain}</td>
            <td>{surfaceWater}</td>
            <td>{population}</td>
            <td>{films}</td>
            <td>{created}</td>
            <td>{edited}</td>
            <td>{url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

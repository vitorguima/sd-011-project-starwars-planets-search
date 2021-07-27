import React, { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';

export default function Table() {
  const { data, filterOn, setFilterOn, tableData, setTableData,
    filters:
      { filterByName:
        { name: planetName }, filterByNumericValues } } = useContext(GlobalContext);
  const { column, comparison, value } = filterByNumericValues[0];
  let SearchFilter = tableData;
  if (filterOn) {
    switch (comparison) {
    case ('maior que'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10)),
      );
      break;
    case ('menor que'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10)),
      );
      break;
    case ('igual a'):
      setTableData(
        data.filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10)),
      );
      break;
    default:
      break;
    }
    setFilterOn(false);
  }

  SearchFilter = tableData
    .filter((planet) => planet.name.includes(planetName.toLowerCase()));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {SearchFilter.map((planet, index) => (
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
            </tr>))}
        </tbody>
      </table>
      )
    </div>
  );
}

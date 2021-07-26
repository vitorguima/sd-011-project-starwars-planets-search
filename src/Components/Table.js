import React, { useContext } from 'react';
import RequisitionContext from '../Context/RequisitionContext';

export default function Table() {
  const { data,
    filters: { filterByName: { name: planetName } } } = useContext(RequisitionContext);

  let filteredData = [[]];

  console.log(data);

  if (data.length > 0) {
    filteredData = data.map(
      (planet) => Object.entries(planet).filter((keyName) => keyName[0] !== 'residents'),
    );
    console.log(filteredData);
  }

  const inputTextData = data.filter(
    (planet) => planet.name.toLowerCase().includes(planetName.toLowerCase()),
  );

  return (
    <table>
      <thead>
        <tr>
          {filteredData[0].map((planet, index) => <th key={ index }>{planet[0]}</th>)}
        </tr>
      </thead>
      <tbody>
        {(planetName === '' ? data : inputTextData).map(({
          name,
          rotation_period: rotation,
          orbital_period: orbit,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr key={ name }>
            <td>{ name }</td>
            <td>{ rotation }</td>
            <td>{ orbit }</td>
            <td>{ diameter }</td>
            <td>{ climate }</td>
            <td>{ gravity }</td>
            <td>{ terrain }</td>
            <td>{ surfaceWater }</td>
            <td>{ population }</td>
            <td>{ films }</td>
            <td>{ created }</td>
            <td>{ edited }</td>
            <td>{ url }</td>
          </tr>
        ))}
      </tbody>
    </table>);
}

import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { data } = useContext(PlanetsContext);
  console.log(data);
  return (
    <table>
      <tr>

        {/* {data
          && Object.keys(data[0]).map((item, index) => (
            <th key={ `${item} ${index}` }>{item.toUpperCase()}</th>
          ))} */}

        <th>name</th>
        <th>rotation_period</th>
        <th>orbital_period</th>
        <th>diameter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface_water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>url</th>

      </tr>

      {data
        && data.map((item) => (
          <tr key={ `${item.name}` }>
            {Object.values(item).map((value, index) => (
              value === item.name ? (
                <td key={ `${value} ${index}` } data-testid="planet-name">
                  {value}
                </td>
              ) : (
                <td key={ `${value} ${index}` }>{value}</td>
              )))}
          </tr>
        ))}

    </table>
  );
}

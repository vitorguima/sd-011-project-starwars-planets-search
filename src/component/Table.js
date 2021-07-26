import React, { useContext } from 'react';
import ContextApi from '../context/ContextApi';

export default function Table() {
  const { data, handleChangeInputFilter, planetsFilter } = useContext(ContextApi);

  return (
    <table>
      <input
        data-testid="name-filter"
        onChange={ ({ target }) => handleChangeInputFilter(target.value) }
      />
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

      {planetsFilter.length > 0
        ? planetsFilter.map((item) => (
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
        ))
        : data.map((item2) => (
          <tr key={ `${item2.name}` }>
            {Object.values(item2).map((value, index) => (
              value === item2.name ? (
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

import React, { useContext } from 'react';
import GlobalContext from '../context/Context';
import Filters from './Filters';

function Table() {
  const { data: { data }, headers } = useContext(GlobalContext);
  return (
    <div>
      <Filters />
      <table>
        <thead>
          <tr>
            {headers
              .map((title, index) => <th key={ index } value={ title }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data && data.map((value, index) => (
            <tr key={ index }>
              <td>{ value.name }</td>
              <td>{ value.rotation_period }</td>
              <td>{ value.orbital_period }</td>
              <td>{ value.diameter }</td>
              <td>{ value.climate }</td>
              <td>{ value.gravity }</td>
              <td>{ value.terrain }</td>
              <td>{ value.surface_water }</td>
              <td>{ value.population }</td>
              <td>{ value.films }</td>
              <td>{ value.created }</td>
              <td>{ value.edited }</td>
              <td>{ value.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

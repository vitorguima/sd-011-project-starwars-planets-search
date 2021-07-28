import React, { useContext } from 'react';
import ContextApp from '../context/ContextApp';

function ShowTable() {
  const { titles, data } = useContext(ContextApp);

  return (
    <table>
      <tr>
        { titles.map((titleColumn, index) => (
          <th key={ index }>{ titleColumn }</th>
        )) }
      </tr>

      { data.map((contentColumn, index) => (
        <tr key={ index }>
          <td>{ contentColumn.name }</td>
          <td>{ contentColumn.rotation_period }</td>
          <td>{ contentColumn.orbital_period }</td>
          <td>{ contentColumn.diameter }</td>
          <td>{ contentColumn.climate }</td>
          <td>{ contentColumn.gravity }</td>
          <td>{ contentColumn.terrain }</td>
          <td>{ contentColumn.surface_water }</td>
          <td>{ contentColumn.population }</td>
          <td>{ contentColumn.films }</td>
          <td>{ contentColumn.createt }</td>
          <td>{ contentColumn.edited }</td>
          <td>{ contentColumn.url }</td>
        </tr>
      )) }
    </table>
  );
}

export default ShowTable;

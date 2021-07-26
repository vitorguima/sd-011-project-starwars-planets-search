import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import TableRowContent from './TableRowContent';

export default function Table() {
  const { planetsResult } = useContext(TableContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_Period</th>
            <th>Orbital_Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsResult
            .map((item, index) => <TableRowContent item={ item } key={ index } />)}
        </tbody>
      </table>
    </div>
  );
}

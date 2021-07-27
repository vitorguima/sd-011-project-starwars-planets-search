import React from 'react';
import table from '../styles/table.css';

function Table() {
  return (
    <div>
      <h2>Componente Tabela</h2>
      <table>
        <thead>
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
        </thead>
      </table>
    </div>
  );
}

export default Table;

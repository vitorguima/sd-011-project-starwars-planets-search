import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import TableRowContent from './TableRowContent';

export default function Table() {
  const {
    planetsResult,
    handleFilters,
    filteredResult,
    valuePlanets,
  } = useContext(TableContext);

  return (
    <div>
      <label htmlFor="search-input">
        Search Planet
        <input
          id="search-input"
          type="text"
          value={ valuePlanets }
          onChange={ (event) => handleFilters(event) }
          data-testid="name-filter"
        />
      </label>
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
          {filteredResult.length === 0 ? planetsResult
            .map((item, index) => <TableRowContent item={ item } key={ index } />)
            : filteredResult
              .map((item, index) => <TableRowContent item={ item } key={ index } />)}
        </tbody>
      </table>
    </div>
  );
}

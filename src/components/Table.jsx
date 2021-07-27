import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import SearchFieldName from './SearchFieldName';

const Table = () => {
  const { data, filterName } = useContext(PlanetsContext);
  return (
    <div>
      <SearchFieldName />
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
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data.filter((planet) => (planet.name.toLowerCase().includes(filterName)))
              .map((items, index) => (
                <tr key={ index }>
                  <td>{items.name}</td>
                  <td>{items.rotation_period}</td>
                  <td>{items.orbital_period}</td>
                  <td>{items.diameter}</td>
                  <td>{items.climate}</td>
                  <td>{items.gravity}</td>
                  <td>{items.terrain}</td>
                  <td>{items.surface_water}</td>
                  <td>{items.population}</td>
                  <td>{items.films}</td>
                  <td>{items.created}</td>
                  <td>{items.edited}</td>
                  <td>{items.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;

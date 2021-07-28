import React, { useContext } from 'react';
import PlanetsContext from '../Providers/PlanetsContext';
import '../App.css';
import Filters from './Filters';

function Table() {
  const { filterReturn } = useContext(PlanetsContext);
  const myFilter = filterReturn();
  const loading = <p>Loading...</p>;

  return (
    <div className="demo">
      <Filters />
      {myFilter
        ? (
          <table>
            <caption>StarWars Table</caption>
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
              {myFilter.map((itens, key) => (
                <tr key={ key }>
                  <td>{itens.name}</td>
                  <td>{itens.rotation_period}</td>
                  <td>{itens.orbital_period}</td>
                  <td>{itens.diameter}</td>
                  <td>{itens.climate}</td>
                  <td>{itens.gravity}</td>
                  <td>{itens.terrain}</td>
                  <td>{itens.surfaceWater}</td>
                  <td>{itens.population}</td>
                  <td>{itens.films}</td>
                  <td>{itens.created}</td>
                  <td>{itens.edited}</td>
                  <td>{itens.url}</td>
                </tr>))}
            </tbody>
          </table>) : (
          loading
        )}
    </div>
  );
}

export default Table;

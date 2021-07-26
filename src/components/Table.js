import React, { useContext, useEffect } from 'react';
import SpacesContext from '../context/SpacesContext';

import '../styles/Table.css';

function Table() {
  const { planetList, setPlanetList } = useContext(SpacesContext);

  useEffect(() => {
    const getPlanets = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planetsJSON = await fetch(URL);
      const data = planetsJSON.json();
      return data;
    };
    getPlanets().then((planets) => setPlanetList(planets.results));
  }, [setPlanetList]);

  function renderTableBody(planets) {
    return (
      planets.map(({
        climate,
        created,
        diameter,
        edited,
        films,
        gravity,
        name,
        orbital_period: orbitalPeriod,
        population,
        rotation_period: rotationPeriod,
        surface_water: surfaceWater,
        terrain,
        url,
      }, index) => (
        <tr
          key={ index }
        >
          <td>{name}</td>
          <td>{rotationPeriod}</td>
          <td>{orbitalPeriod}</td>
          <td>{surfaceWater}</td>
          <td>{diameter}</td>
          <td>{climate}</td>
          <td>{gravity}</td>
          <td>{terrain}</td>
          <td>{population}</td>
          <td>{films}</td>
          <td>{created}</td>
          <td>{edited}</td>
          <td>{url}</td>
        </tr>
      ))
    );
  }

  return (
    <table className="planets-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Oribtal Period</th>
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
        {planetList.length ? renderTableBody(planetList) : null}
      </tbody>
    </table>
  );
}

export default Table;

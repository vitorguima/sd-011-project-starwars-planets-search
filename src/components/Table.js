import React, { useContext, useEffect } from 'react';
import SpacesContext from '../context/SpacesContext';

import '../styles/Table.css';

function Table() {
  const {
    setPlanetList,
    setFilteredPlanets,
    filteredPlanets,
  } = useContext(SpacesContext);

  useEffect(() => {
    const getPlanets = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planetsJSON = await fetch(URL);
      const data = planetsJSON.json();
      return data;
    };
    getPlanets().then((planets) => {
      setPlanetList(planets.results);
      setFilteredPlanets(planets.results);
    });
  }, [setFilteredPlanets, setPlanetList]);

  function renderTableBody(planets) {
    return (
      planets.map(({
        name,
        diameter,
        rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod,
        gravity,
        population,
        climate,
        terrain,
        surface_water: surfaceWater,
        films,
        url,
        created,
        edited,
      }, index) => (
        <tr
          key={ index }
        >
          <td>{name}</td>
          <td>{diameter}</td>
          <td>{rotationPeriod}</td>
          <td>{orbitalPeriod}</td>
          <td>{gravity}</td>
          <td>{population}</td>
          <td>{climate}</td>
          <td>{terrain}</td>
          <td>{surfaceWater}</td>
          <td>{films}</td>
          <td>{url}</td>
          <td>{created}</td>
          <td>{edited}</td>
        </tr>
      ))
    );
  }

  return (
    <table className="planets-table">
      <thead>
        <tr>
          <th>name</th>
          <th>diameter</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>gravity</th>
          <th>population</th>
          <th>climate</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>films</th>
          <th>url</th>
          <th>created</th>
          <th>edited</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.length ? renderTableBody(filteredPlanets) : null}
      </tbody>
    </table>
  );
}

export default Table;

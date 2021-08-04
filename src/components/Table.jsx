import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { planetsAPI } = useContext(PlanetsContext);
  const [planets, setPlanets] = useState();
  const [filters, setFilters] = useState({
    filters:
    { filterByName: { name: '' } },
  });
  const header = ['Name', 'Rotation', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'Url'];

  function handleInputPlanet({ target }) {
    setFilters({ filters: { filterByName: { name: target.value } } });
    console.log(filters);
  }

  useEffect(() => {
    setPlanets(planetsAPI.filter((planet) => planet.name.toLowerCase()
      .includes(filters.filters.filterByName.name)));
  }, [planetsAPI, filters.filters.filterByName.name]);

  if (!planets) {
    return <div>Loading!</div>;
  }

  return (
    <>
      <label htmlFor="input-planets">
        <input
          onChange={ (event) => handleInputPlanet(event) }
          data-testid="name-filter"
          placeholder="Filter by name"
        />
      </label>
      <table>
        <thead>
          <tr className="tableHead">
            {header.map((h, i) => <th key={ i }>{ h }</th>)}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, i) => (
            <tr key={ i } className="tableBody">
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films[0]}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

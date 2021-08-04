import React, { useContext } from 'react';
import StarWarsContext from './Context';

function Table() {
  const { loading,
    data,
    filters: { filterByName: { name } },
    planetsByValue,
  } = useContext(StarWarsContext);

  const filteredPlanets = planetsByValue.length > 0 ? planetsByValue
    : data.filter((planet) => (planet.name.toLowerCase().includes(name)));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
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
          <th>Residents</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity}</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              {
                planet.residents.length
                  ? planet.residents.map((resident) => (
                    <a
                      key={ resident }
                      href={ resident }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      { resident }
                      <br />
                    </a>
                  )) : 'No Residents'
              }
            </td>
            <td>
              { planet.films.map((movie, index) => (
                <a
                  key={ index }
                  href={ movie }
                >
                  { movie }
                  <br />
                </a>
              )) }
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;

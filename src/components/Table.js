import React, { useContext } from 'react';
import SWPlanetsContext from '../context/Context';
import swloading from '../images/swloading.gif'

function Table() {
  const { loading, planets, filters: { filterByName: { name } } } = useContext(SWPlanetsContext);
  
  const filters = planets.filter((planet) => (
    planet.name.toLowerCase().includes(name)));

  if (loading) {
    return (
      <img
      src={ swloading } 
      alt="carregando"
    />
    // <p>carregando</p>
    )
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
        { filters.map((r) => (
          <tr key={ r.name }>
            <td>{ r.name }</td>
            <td>{ r.rotation_period }</td>
            <td>{ r.orbital_period }</td>
            <td>{ r.diameter }</td>
            <td>{ r.climate }</td>
            <td>{ r.gravity }</td>
            <td>{ r.terrain }</td>
            <td>{ r.surface_water }</td>
            <td>{ r.population }</td>
            <td>
              { 
                r.residents.lenght
                  ? r.residents.map((resident) => (
                    <a
                      key={ resident }
                      href={ resident }
                    >
                      { resident }
                    </a>
                  ))
                  : 'No Residents' 
              }
            </td>
            <td>
              { 
                r.films.map((movie, i) => (
                  <a
                    key={ i }
                    href={ i }
                  >
                    { movie }
                  </a>
                )) 
              }
            </td>
            <td>{ r.created }</td>
            <td>{ r.edited }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
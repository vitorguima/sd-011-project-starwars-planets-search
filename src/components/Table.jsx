import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

const tableHeader = ['Name', 'Rotation', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'Url'];

function Table() {
  const { planets, filters } = useContext(GlobalContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const { name } = filters.filterByName;
    const searchedPlanets = planets.filter(
      (planet) => planet.name.toLowerCase().includes(name),
    );
    setFilteredPlanets(searchedPlanets);
  }, [planets, filters]);

  return (
    <table>
      <thead>
        <tr>
          { tableHeader.map((title, index) => <th key={ index }>{ title }</th>) }
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet, index) => (
          <tr key={ index }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films[0] }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

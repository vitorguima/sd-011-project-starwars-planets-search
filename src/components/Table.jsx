import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

const tableHeader = ['Name', 'Rotation', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'Url'];

function Table() {
  const { planets, filters } = useContext(GlobalContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const { filters: { filterByNumericValues } } = useContext(GlobalContext);
  const { name } = filters.filterByName;

  useEffect(() => {
    // O Gabriel Carvalho da turma 11 me ajudou na implementação dessa função
    const searchedPlanets = () => {
      if (filterByNumericValues[0]) {
        const { colum, comparison, value } = filterByNumericValues[0];
        switch (comparison) {
        case 'maior que':
          return planets.filter(
            (planet) => planet.name.toLowerCase().includes(name)
            && parseInt(planet[colum], 0) > parseInt(value, 0),
          );
        case 'menor que':
          return planets.filter(
            (planet) => planet.name.toLowerCase().includes(name)
            && parseInt(planet[colum], 0) < parseInt(value, 0),
          );
        case 'igual a':
          return planets.filter(
            (planet) => planet.name.toLowerCase().includes(name)
            && parseInt(planet[colum], 0) === parseInt(value, 0),
          );
        default:
        }
      }
      return planets.filter(
        (planet) => planet.name.toLowerCase().includes(name),
      );
    };
    setFilteredPlanets(searchedPlanets());
  }, [planets, filters, filterByNumericValues, name]);

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

import React, { useContext } from 'react';
import Context from '../context/Context';

const tableHeader = ['Name', 'Rotation', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'Url'];

const Table = () => {
  const { data, filterName: { filters } } = useContext(Context);
  const { comparison, column, value } = filters.filterByNumericValues;
  const preFilteredPlanets = data.filter((planet) => planet.name
    .toLowerCase().includes(filters.filterByName.name.toLowerCase()));
  let filteredPlanets = preFilteredPlanets;
  switch (comparison) {
  case 'maior que':
    filteredPlanets = preFilteredPlanets.filter((planet) => (
      parseFloat(planet[column]) > parseFloat(value)));
    break;
  case 'menor que':
    filteredPlanets = preFilteredPlanets.filter((planet) => (
      parseFloat(planet[column]) < parseFloat(value)));
    break;
  case 'igual a':
    filteredPlanets = preFilteredPlanets.filter((planet) => (
      parseFloat(planet[column]) === parseFloat(value)));
    break;
  default:
    break;
  }
  if (!data) return <div>loading...</div>;
  return (
    <table>
      <thead>
        <tr>
          { tableHeader.map((title, index) => <th key={ index }>{ title }</th>) }
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet, index) => (
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
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

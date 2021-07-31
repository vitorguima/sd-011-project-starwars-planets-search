import React, { useContext } from 'react';
import Context from '../context/Context';

const tableHeader = ['Name', 'Rotation', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity',
  'Terrain', 'Surface Water', 'Population',
  'Films', 'Created', 'Edited', 'Url'];

const Table = () => {
  const { data, filterName: { filters } } = useContext(Context);
  const filteredPlanets = data.filter((planet) => planet.name
    .toLowerCase().includes(filters.filterByName.name.toLowerCase()));
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

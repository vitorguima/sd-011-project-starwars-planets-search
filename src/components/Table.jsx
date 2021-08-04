import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { dataPlanets, filterPlanets } = useContext(PlanetContext);
  const renderingTable = (objPlanet, index) => (
    <tr key={ index }>
      {Object.values(objPlanet).map((planet, i) => (
        <td key={ i }>{planet}</td>
      ))}
    </tr>
  );

  // const renderingKeyTable = (objPlanet, index) => (
  //   <thead>
  //     <tr key={ index }>
  //       {Object.keys(objPlanet).map((key, i) => (
  //         <th key={ i }>{key}</th>
  //       ))}
  //     </tr>
  //   </thead>
  // );

  return (
    <table width="100%" border="1px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation_period</th>
          <th>Orbital_period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      {/* {dataPlanets.map((el, index) => renderingKeyTable(el, index))} */}
      <tbody>
        {filterPlanets.length > 0
          ? filterPlanets.map((planet, index) => renderingTable(planet, index))
          : dataPlanets.map((planet, index) => renderingTable(planet, index))}
      </tbody>
    </table>
  );
}

export default Table;

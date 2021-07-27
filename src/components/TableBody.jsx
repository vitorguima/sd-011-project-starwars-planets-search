import React from 'react';

//  sort by RODRIGO RUAN
const TableBody = ({ filteredData, filter }) => (
  filteredData.sort((planetA, planetB) => {
    const { column, sort } = filter.order;
    if (sort === 'ASC' && /^[0-9]/.test(planetA[column])) {
      //  verify if column is numeric
      return Number(planetA[column]) - Number(planetB[column]);
    }
    if (sort === 'ASC') {
      return planetA[column].charCodeAt(0) - planetB[column].charCodeAt(0); // verifiy just the firts letter
    }
    if (sort === 'DESC' && /^[0-9]/.test(planetA[column])) {
      return Number(planetB[column]) - Number(planetA[column]);
    }
    return planetB[column].charCodeAt(0) - planetA[column].charCodeAt(0);
  }).map((item) => {
    const {
      name,
      rotation_period: rotationPeriod,
      orbital_period: orbitPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    } = item;
    return (
      <tr key={ name }>
        <td data-testid="planet-name">{name}</td>
        <td>{rotationPeriod}</td>
        <td>{orbitPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>{films}</td>
        <td>{created}</td>
        <td>{edited}</td>
        <td>{url}</td>
      </tr>
    );
  })
);

export default TableBody;

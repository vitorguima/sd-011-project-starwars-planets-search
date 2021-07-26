import React from 'react';
import PropTypes from 'prop-types';

function TableRowContent({ item }) {
  const {
    climate,
    created,
    diameter,
    edited,
    films,
    gravity,
    name,
    orbital_period: orbitalPeriod,
    population,
    rotation_period: rotationPeriod,
    surface_water: surfaceWater,
    terrain,
    url,
  } = item;
  return (
    <tr>
      <td>{name}</td>
      <td>{rotationPeriod}</td>
      <td>{orbitalPeriod}</td>
      <td>{diameter}</td>
      <td>{climate}</td>
      <td>{gravity}</td>
      <td>{terrain}</td>
      <td>{surfaceWater}</td>
      <td>{population}</td>
      {films.map((film, index) => <td key={ index }>{film}</td>)}
      <td>{created}</td>
      <td>{edited}</td>
      <td>{url}</td>
    </tr>
  );
}

export default TableRowContent;

TableRowContent.propTypes = {
  item: PropTypes.shape({
    climate: PropTypes.string,
    created: PropTypes.string,
    diameter: PropTypes.string,
    edited: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.string),
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.string,
    population: PropTypes.number,
    rotation_period: PropTypes.number,
    surface_water: PropTypes.number,
    terrain: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

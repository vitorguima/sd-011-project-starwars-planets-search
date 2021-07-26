import React from 'react';
import { PropTypes } from 'prop-types';

export default function Row(props) {
  const { planet } = props;
  const { climate,
    created, diameter, edited,
    films, gravity, name,
    population,
    terrain, url } = planet;
  return (
    <tr>
      <td>{name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{diameter}</td>
      <td>{climate}</td>
      <td>{gravity}</td>
      <td>{terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{population}</td>
      <td>{films}</td>
      <td>{created}</td>
      <td>{edited}</td>
      <td>{url}</td>
    </tr>

  );
}

Row.propTypes = {
  planet: PropTypes.objectOf(PropTypes.any).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow({ planet }) {
  const {
    name,
    films,
    population,
    diameter,
    gravity,
    climate,
    terrain,
    surface_water: surfaceWater,
    orbital_period: orbitalPeriod,
    rotation_period: rotationPeriod,
    created,
    edited,
    url,
  } = planet;

  return (
    <tr>
      <td>{ name }</td>
      <td>{ films.map((film) => <a key={ film } href={ film }>Link</a>) }</td>
      <td>{ population }</td>
      <td>{ diameter }</td>
      <td>{ gravity }</td>
      <td>{ climate }</td>
      <td>{ terrain }</td>
      <td>{ surfaceWater }</td>
      <td>{ orbitalPeriod }</td>
      <td>{ rotationPeriod }</td>
      <td>{ created }</td>
      <td>{ edited }</td>
      <td>{ url }</td>
    </tr>
  );
}

TableRow.propTypes = {
  planet: PropTypes.objectOf(PropTypes.any),
}.isRequired;

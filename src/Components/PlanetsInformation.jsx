import React from 'react';
import propTypes from 'prop-types';

function PlanetsInformation({ info }) {
  // const { climate,
  //   created,
  //   diameter,
  //   edited,
  //   films,
  //   gravity,
  //   name,
  //   orbital_period,
  //   population,
  //   rotation_period,
  //   surface_water,
  //   terrain,
  //   url } = info;

  return (
    <tr>
      {Object.values(info).map((anyInfo) => <td key>{anyInfo}</td>)}
    </tr>
  );
}

export default PlanetsInformation;

PlanetsInformation.propTypes = {
  info: propTypes.string.isRequired,
};

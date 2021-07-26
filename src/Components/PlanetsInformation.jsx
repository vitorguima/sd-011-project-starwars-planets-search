import React from 'react';
import propTypes from 'prop-types';

function PlanetsInformation({ info }) {
  return (
    info.map((anyInfo) => <td key>{anyInfo}</td>)
  );
}

export default PlanetsInformation;

PlanetsInformation.propTypes = {
  info: propTypes.string.isRequired,
};

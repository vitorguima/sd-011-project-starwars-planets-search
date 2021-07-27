import React from 'react';
// import PropTypes from 'prop-types';

import PlanetInput from './PlanetInput';
import Selector from './Selector';

export default function InputHeader() {
  return (
    <div>
      <div className="row">
        <PlanetInput />
      </div>
      <Selector />
    </div>
  );
}

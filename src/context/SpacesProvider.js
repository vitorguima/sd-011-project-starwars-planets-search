import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SpacesContext from './SpacesContext';

function SpacesProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  const context = { planetList, setPlanetList };

  return (
    <SpacesContext.Provider value={ context }>
      {children}
    </SpacesContext.Provider>
  );
}

SpacesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SpacesProvider;

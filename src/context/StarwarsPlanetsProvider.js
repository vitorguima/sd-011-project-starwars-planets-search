import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starwarsPlanetsContext from './starwarsPlanetsContext';

function StarwarsPlanetsProvider({ children }) {
  const [data, setData] = useState([{}]);
  const valueState = {
    data,
    setData,
  };

  return (
    <starwarsPlanetsContext.Provider value={ valueState }>
      { children }
    </starwarsPlanetsContext.Provider>
  );
}

StarwarsPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsPlanetsProvider;

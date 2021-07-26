import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

export default function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function savePlanets(data) {
    setPlanets(data);
    setIsLoading(false);
  }

  function changeLoading() {
    setIsLoading(true);
  }

  const context = {
    planets,
    savePlanets,
    isLoading,
    changeLoading,
  };

  return (
    <div>
      <SWContext.Provider value={ context }>
        { children }
      </SWContext.Provider>
    </div>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

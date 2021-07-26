import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RequisitionContext from './RequisitionContext';
/* import response from '../testData'; */

export default function RequisitionProvider({ children }) {
  const [contextState, setContextState] = useState([]);

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const planets = async () => {
      const getSWInfo = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await getSWInfo.json();
      setContextState(results);
    };
    planets();
  }, []);

  const contextValue = {
    data: contextState,
    filters: {
      filterByName: {
        name: filterName,
        setFilterName,
      },
    },
  };

  return (
    <RequisitionContext.Provider value={ contextValue }>
      {children}
    </RequisitionContext.Provider>
  );
}

RequisitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

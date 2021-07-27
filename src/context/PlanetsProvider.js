import React from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

function PlanetsProvider({ children }) {
  const { data, error, loading, request } = useFetch();
  return (
    <PlanetsContext.Provider value={ { data, error, loading, request } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext({});

export const AuthProvider = (props) => {
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const { children } = props;
  return (
    <PlanetsContext.Provider value={ { filters, setFilters } }>
      {children}
    </PlanetsContext.Provider>
  );
};

// Porta de entrada para alterar o estado global:
export const useAuth = () => React.useContext(PlanetsContext);

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.Object),
}.isRequired;

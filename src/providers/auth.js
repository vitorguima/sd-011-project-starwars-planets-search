import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [planets, setPlanets] = useState({
    data: {
      results: '',
      count: 0,
    },
  });

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const { children } = props;
  console.log(children);

  return (
    <AuthContext.Provider value={ { planets, setPlanets, filters, setFilters } }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    data: {
      results: '',
      count: 0,
    },
  });

  const { children } = props;
  console.log(children);

  return (
    <AuthContext.Provider value={ { user, setUser } }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

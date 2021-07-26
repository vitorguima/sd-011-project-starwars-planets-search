import PropTypes from 'prop-types';
import React from 'react';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [data, setData] = React.useState([]);
  return (
    <GlobalContext.Provider value={ { data, setData } }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;

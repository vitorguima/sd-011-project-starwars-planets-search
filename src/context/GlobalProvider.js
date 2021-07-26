import PropTypes from 'prop-types';
import React from 'react';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [data, setData] = React.useState([]);
  const [filterName, setFilterName] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });
  return (
    <GlobalContext.Provider value={ { data, setData, filterName, setFilterName } }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;

import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../service/Api';

export const Context = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState('');

  const setApiToState = () => {
    fetchApi().then((results) => setData(results));
  };

  React.useEffect(() => {
    setApiToState();
  }, []);

  const providerValues = {
    data,
    setData,
    setName,
    filters: {
      filterByName: {
        name,
      },
    },
  };

  return (
    <Context.Provider value={ providerValues }>
      {children}
    </Context.Provider>
  );
};

GlobalStorage.propTypes = {
  children: PropTypes.node.isRequired,
};

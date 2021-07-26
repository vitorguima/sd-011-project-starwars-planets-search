import React from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <GlobalContext.Provider value={ { data } }>
      { children }
    </GlobalContext.Provider>
  );
};

GlobalStorage.propTypes = {
  children: PropTypes.element.isRequired,
};

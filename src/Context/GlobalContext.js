import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const GlobalContext = ({ children }) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((results) => results.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Context.Provider value={ { data } }>
      {children}
    </Context.Provider>
  );
};

export default GlobalContext;

GlobalContext.propTypes = {
  children: PropTypes.element.isRequired,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Mycontext from './MyContext';

function PlanetsProvider({ children }) {
  const [data, fetchAPI] = useState([]);

  const fetchAPI1 = async () => {
    const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await endpoint.json();
    fetchAPI(results);
  };

  useEffect(() => {
    fetchAPI1();
  }, []);

  const context = {
    data,
  };

  return (
    <Mycontext.Provider value={ context }>
      { children }
    </Mycontext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

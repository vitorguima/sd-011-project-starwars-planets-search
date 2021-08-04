import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import StarContext from './StarContext';

function Provider({ children }) {
  const [responseAPI, setResponseAPI] = useState([]);

  const fetchAPI = async () => {
    // const apiStarWars = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';
    fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json')
      .then((response) => response.json())
      .then((resp) => setResponseAPI(resp.results));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const stateGlobal = {
    fetchAPI,
    responseAPI,
  };

  return (

    <div>
      <StarContext.Provider value={ stateGlobal }>
        {children}
      </StarContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

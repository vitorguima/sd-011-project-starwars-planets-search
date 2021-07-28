import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIContext';

function APIProvider({ children }) {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((resultData) => setData(resultData.results));
  }, []);

  return (
    <div>
      <APIContext.Provider value={ { data } }>
        { children }
      </APIContext.Provider>
    </div>
  );
}

APIProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default APIProvider;

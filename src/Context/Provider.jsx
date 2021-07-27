import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [keyWord, getKeyWord] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint)
        .then((receivedData) => receivedData.json());
      const filteredResults = Object.values(results)
        .filter((item) => item.codein !== 'residents').map((obj) => obj);
      setData(filteredResults);
    };

    getPlanets();
  }, []);

  const obj = {
    data,
    setData,
    keyWord,
    getKeyWord,
  };
  return (
    <PlanetsContext.Provider value={ obj }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;

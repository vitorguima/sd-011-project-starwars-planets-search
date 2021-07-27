import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPlanet = async () => {
      const fetchPlanet = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');

      try {
        const json = await fetchPlanet.json();
        const { results } = await json;
        results.forEach((element) => {
          delete element.residents;
        });
        setData(results);
      } catch (error) {
        return error;
      }
    };

    getPlanet();
  }, []);

  const contextValue = {
    data,
    setData,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextPlanetsApi from './ContextPlanetsApi';

// async function fetchPlanetsAPI() {
//   const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
//   const response = await fetch(url);
//   const results = await response.json();
//   return results;
// }

function ProviderPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const contextValue = {
    planets,
    setPlanets,
  };

  useEffect(() => {
    const fetchPlanetsAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      // results.forEach((el) => {
      //   delete el.residents;
      return setPlanets(results);
      // });
    };
    fetchPlanetsAPI();
  }, []);

  // useEffect(() => {
  //   fetchPlanetsAPI().then(({ results }) => {
  //     results.forEach((el) => {
  //       delete el.residents;
  //       return setPlanets(results);
  //     });
  //   });
  // }, []);

  return (
    <ContextPlanetsApi.Provider value={ contextValue }>
      {children}
    </ContextPlanetsApi.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;

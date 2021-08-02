import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  const contextValue = {
    data,
    setData,
    planets,
    setPlanets,

  };

  useEffect(() => {
    const setResultsAsData = async () => {
      await fetchPlanets().then(
        ((results) => (setData(results.results))),
        (() => null),
      );
    };
    setResultsAsData();
  }, []);

  useEffect(() => {
    setPlanets([...data]);
  }, [data]);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

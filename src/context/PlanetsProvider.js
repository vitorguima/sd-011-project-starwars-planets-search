import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import fetchAllPlanetsInAPI from '../services/fetchAllPlanetsInAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await fetchAllPlanetsInAPI();
      setPlanets(data);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    planets,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

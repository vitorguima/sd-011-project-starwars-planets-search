import React, { useEffect, useState } from 'react';
import fetchAllPlanetsInAPI from '../services/fetchAllPlanetsInAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await fetchAllPlanetsInAPI();
      // setPlanets(data);
      console.log(data);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    planets,
  };

  return (
    <Provider value={ contextValue }>
      { children }
    </Provider>
  );
}

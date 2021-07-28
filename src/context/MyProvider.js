import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import fetchApi from '../Services/api';

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState();
  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await fetchApi();
      const list = planetsList.results.map((residents) => {
        delete residents.residents;
        return residents;
      });
      setPlanets(list);
      console.log(planetsList);
    };
    getPlanetsList();
  }, []);

  const contextValue = {
    planets,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

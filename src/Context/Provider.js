import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planets = await response.json();
      console.log(planets);
      setData(planets.results.map((planet) => {
        delete planet.residents;
        return planet;
      }));
    }
    fetchData();
  }, []);

  return (
    <Context.Provider value={ { data } }>
      {children}
    </Context.Provider>
  );
}

export default Provider;

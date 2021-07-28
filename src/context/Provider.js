import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setFilterByName] = useState('');
  const [filterByNumericValues, setFilters] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      // Operador delete remove propriedades de objetos.
      // Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
      setPlanets(results.filter((resp) => delete resp.residents));
    };
    getPlanets();
  }, []);

  const contextValue = {
    planets,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
    setFilterByName,
    setFilters,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;

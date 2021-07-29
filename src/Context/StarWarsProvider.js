import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [gotInfo, setGotInfo] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((planetsInfo) => planetsInfo.json());
      results.map((e) => delete e.residents); // Deleta os residents de cada um dos objetos, conforme pede no requisito.
      setData(results);
      setGotInfo(true);
    };
    getPlanets();
  }, []);

  const contextValue = {
    data,
    gotInfo,
    setName,
    name,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

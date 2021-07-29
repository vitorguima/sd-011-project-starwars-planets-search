import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gotInfo, setGotInfo] = useState(false);
  const [filterByName, setName] = useState({ name: '' });

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((planetsInfo) => planetsInfo.json());
      results.map((e) => delete e.residents); // Deleta os residents de cada um dos objetos, conforme pede no requisito.
      setData(results);
      setFilteredData(results);
      setGotInfo(true);
    };
    getPlanets();
  }, []);

  const contextValue = {
    filteredData,
    setFilteredData,
    setData,
    data,
    gotInfo,
    setName,
    filters: {
      filterByName,
    },
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

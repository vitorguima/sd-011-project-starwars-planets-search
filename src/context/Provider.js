import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import StarContext from './StarContext';
import testData from '../testData';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByValue, setFilterByValue] = useState([]);

  useEffect(() => {
    const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchAPI = async () => {
      const planetsList = await fetch(PLANETS_URL)
        .then((res) => res.json())
        .then(({ results }) => results);
      return planetsList
        ? setData(planetsList)
        : setData(testData.results);
    };
    fetchAPI();
  });

  useEffect(() => {}, [filterByValue]);

  const filters = {
    filterByName: {
      name: filterByName,
    },
    filterByValue,
  };

  const context = { data, setFilterByName, setFilterByValue, filters };

  return (

    <div>
      <StarContext.Provider value={ context }>
        {children}
      </StarContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

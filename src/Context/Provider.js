import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((planets) => planets.json())
        .then((planet) => planet);
      setData(results);
    };
    getPlanets();
  }, []);

  const myDataPlanets = {
    data,
    setData,
    filterPlanets,
    setFilterPlanets,
  };

  return (
    <Context.Provider value={ myDataPlanets }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = ({
  children: PropTypes.func,
}).isRequired;

export default Provider;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((payload) => payload.json());
      results.forEach((item) => {
        delete item.residents;
      });
      setPlanets(results);
    };

    getPlanets();
  }, []);

  const filterName = ({ target }) => {
    setSearchName({
      ...searchName,
      filterByName: { name: target.value },
    });
  };

  return (
    <PlanetsContext.Provider value={ { data, searchName, filterName } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;

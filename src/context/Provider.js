import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

function Provider({ children }) {
  const myfilter = {
    filterByName: {
      name: '',
    },
  };

  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(myfilter);

  const fetchPlanets = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(url);
    const { results } = await response.json();
    setData(results);
    setPlanets(results);
  };

  const filterPlanets = () => {
    if (filters.filterByName.name.length > 0) {
      const filteredPlanets = data.filter((planet) => (
        planet.name.includes(filters.filterByName.name)
      ));
      console.log(filteredPlanets);
      setPlanets(filteredPlanets);
    } else {
      setPlanets(data);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    filterPlanets();
  }, [filters]);

  const contextValue = { data, filters, setFilters, planets, setPlanets };

  return (
    <SWContext.Provider value={ contextValue }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

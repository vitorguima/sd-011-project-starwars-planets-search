import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import { getThePlanets } from '../services';
import * as filterfunctions from '../functions/FilterFunctions';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const get = async () => {
      const r = await getThePlanets();
      await setData(r);
    };
    get();
  }, []);

  useEffect(() => {
    setPlanets(data);
    const { filterByName: { name } } = filters;
    if (name) {
      const filterPlanets = filterfunctions.filterByName(data, name);
      setPlanets(filterPlanets);
    }
  }, [data, filters]);
  console.log(planets);

  function handleTextFilter({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }
  const contextValue = {
    data,
    filters,
    setFilters,
    handleTextFilter,
    planets,
    setPlanets,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
/*
useEffect(() => {
  setPlanets([...data]);
}, [data]); */

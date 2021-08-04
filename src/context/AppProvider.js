import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/apiRequest';

const AppProvider = ({ children }) => {
  const [APIResult, setAPIResult] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [] });

  useEffect(() => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets';

    const getPlanets = async () => {
      const planets = await fetchAPI(url);
      planets.forEach((planet) => delete planet.residents);
      const title = Object.keys(planets[0]).map((info) => info.replace('_', ' '));

      setAPIResult(planets);
      setTitles(title);
    };

    getPlanets();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const { filterByNumericValues } = filters;
      const getComparator = filterByNumericValues[0].comparison;
      const getNumber = Number(filterByNumericValues[0].number);
      const validator = filterByNumericValues[0].column;

      const filteredData = () => {
        switch (true) {
        case getComparator === 'menor que':
          return (APIResult.filter((el) => (
            Number(el[validator]) < getNumber)));
        case getComparator === 'maior que':
          return (APIResult.filter((el) => Number(el[validator]) > getNumber));
        case getComparator === 'igual a':
          return (APIResult.filter((el) => Number(el[validator]) === getNumber));
        default:
          break;
        }
      };

      setDataFiltered(filteredData);
    };

    if (filters.filterByNumericValues[0]) { filterData(); }
  }, [APIResult, filters]);

  const nameFilter = filters.filterByName.name;
  const contextValue = { APIResult,
    dataFiltered,
    titles,
    filters,
    setFilter,
    nameFilter };

  return (
    <ContextApp.Provider value={ contextValue }>
      { children }
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}.isRequired;

export default AppProvider;

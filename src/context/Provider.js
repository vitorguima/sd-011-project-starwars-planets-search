/* REQUESITO 01 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './Context';

function Provider({ children }) {
  const [planetsFullList, setPlanetsFullList] = useState([]);
  const [planetsFiltereditlist, setplanetsFiltereditlist] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
    order: {
      column: '',
      sort: '',
    },
  });
  const {
    filterByNumericValues: { column, comparison, value },
  } = filters;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => data.json())
      .then((response) => {
        setPlanetsFullList(response.results);
        setplanetsFiltereditlist(response.results);
      });
  }, []);

  useEffect(() => {
    const filteredPlanets = planetsFullList.filter((planet) => planet.name
      .toLowerCase()
      .includes(filters.filterByName.name.toLocaleLowerCase()));

    let filteredByNumeric = filteredPlanets;
    if (column) {
      filteredByNumeric = filteredPlanets.filter((planet) => {
        if (comparison === 'maior que') {
          return parseInt(planet[column], 10) > parseInt(value, 10);
        }
        if (comparison === 'menor que') {
          return parseInt(planet[column], 10) < parseInt(value, 10);
        }
        return parseInt(planet[column], 10) === parseInt(value, 10);
      });
    }
    /* SORTPLANETS(filtereditByNum) */
    setplanetsFiltereditlist(filteredByNumeric);
  }, [planetsFullList, filters, column, comparison, value]);

  const contextValue = {
    planetsFullList,
    setPlanetsFullList,
    planetsFiltereditlist,
    filters,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

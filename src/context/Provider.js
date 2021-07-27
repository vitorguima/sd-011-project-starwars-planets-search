/* REQUESITO 01 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './Context';

function Provider({ children }) {
  const [planetsFullList, setPlanetsFullList] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => data.json())
      .then((response) => setPlanetsFullList(response.results));
  }, []);

  const contextValue = {
    planetsFullList,
    setPlanetsFullList,
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

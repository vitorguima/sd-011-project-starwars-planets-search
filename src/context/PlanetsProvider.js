import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import fetchAllPlanetsInAPI from '../services/fetchAllPlanetsInAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await fetchAllPlanetsInAPI();
      // console.log(data.results)
      setPlanets(data.results);
    };
    fetchPlanets();
  }, []);

  // const contextValue = {
  //   planets,
  // };

  return (
    <PlanetsContext.Provider value={ { planets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

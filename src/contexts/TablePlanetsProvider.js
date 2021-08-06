import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TablePlanetsContext from './TablePlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

export default function TablePlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const PlanetsResult = async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
    };
    PlanetsResult();
  }, []);

  const context = {
    planets,
  };

  return (
    <TablePlanetsContext.Provider value={ { ...context } }>
      { children }
    </TablePlanetsContext.Provider>
  );
}

TablePlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

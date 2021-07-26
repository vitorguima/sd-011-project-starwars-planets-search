import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from '../context/TableContext';
import getPlanets from '../services/FetchPlanetsAPI';

export default function TableProvider({ children }) {
  const [planetsResult, setPlanetsResults] = useState([]);

  const getPlanetsFromAPI = async () => {
    const { results } = await getPlanets();
    results.filter((item) => delete item.residents);
    setPlanetsResults(results);
  };

  useEffect(() => {
    getPlanetsFromAPI();
  }, []);

  return (
    <TableContext.Provider value={ { planetsResult } }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

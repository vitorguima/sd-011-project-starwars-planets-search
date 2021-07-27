import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchStarwars from '../services/ApiStar';
import StarContext from './starContext';

export default function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  const getDataFromApi = () => {
    fetchStarwars().then((starData) => setData(starData));
  };

  useEffect(() => getDataFromApi(), []);

  const context = {
    data,
    setData,
    filters,
    setFilters,
  };

  return (
    <StarContext.Provider value={ context }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

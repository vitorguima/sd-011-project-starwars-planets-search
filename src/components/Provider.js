import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './Context';
import getPlanets from '../services/planetsAPI';

function StarWarsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const fetchPlanets = async () => {
    setIsLoading(true);
    const planetsAPI = await getPlanets();
    setData(planetsAPI);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <StarWarsContext.Provider
      value={ {
        isLoading,
        data,
        fetchPlanets,
        filters,
        setFilters,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;

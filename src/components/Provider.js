import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './Context';
import getPlanets from '../services/planetsAPI';

function StarwarsProvider({ children }) { // props descontruction
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [planetsByValue, setPlanetsByValue] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
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
        planetsByValue,
        setPlanetsByValue,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsProvider;

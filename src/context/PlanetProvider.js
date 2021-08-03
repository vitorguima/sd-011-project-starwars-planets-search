import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const resInJSON = await response.json();
      setData(resInJSON.results);
    }
    fetchPlanets();
  }, []);

  return (
    <main>
      <PlanetContext.Provider value={ { data, filters, setFilters } }>
        { children }
      </PlanetContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Provider;

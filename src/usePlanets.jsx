import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetContext = createContext({});

const BASE_URL = 'https://swapi-trybe.herokuapp.com/api/planets';

export function PlanetProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  function fetchAndUpdate(url) {
    setLoading(true);
    fetch(url, { headers: { Accept: 'application/json' } })
      .then((response) => response.json())
      .then(setApiResponse)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchAndUpdate(BASE_URL);
  }, []);

  function fetchNextPage() {

  }

  return (
    <PlanetContext.Provider
      value={ {
        loading,
        error,
        fetchNextPage,
        apiResponse,
      } }
    >
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePlanets = () => useContext(PlanetContext);

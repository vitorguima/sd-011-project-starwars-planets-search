import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetContext = createContext({});

const BASE_URL = 'https://swapi-trybe.herokuapp.com/api/planets';

const combineFilters = ([head, ...tail]) => (
  data,
) => (!head ? true : (head(data) && combineFilters(tail)(data)));

export function PlanetProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState([]);

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

  useEffect(() => {
    if (!apiResponse) return;

    const { results } = apiResponse;

    if (!filters.length) {
      setPlanets(results);
      return;
    }

    const filterFuncs = filters.map(({ filterFunc }) => filterFunc);
    setPlanets(results.filter((planet) => combineFilters(filterFuncs)(planet)));
  }, [apiResponse, filters]);

  function addFilter(filter) {
    setFilters((previous) => {
      if (previous.find(({ type }) => type === filter.type)) {
        return [...previous.filter(({ type }) => type !== filter.type), filter];
      }

      return [...previous, filter];
    });
  }

  return (
    <PlanetContext.Provider
      value={ {
        loading,
        error,
        apiResponse,
        planets,
        addFilter,
        filters,
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

import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlanetContext = createContext({});

const SORTERS = {
  A_BEFORE: -1,
  B_BEFORE: 1,
  KEEP: 0,
};

const SORT_ALPHABETICALLY = {
  ASC: (a, b) => {
    if (a.name > b.name) {
      return SORTERS.B_BEFORE;
    }

    if (b.name > a.name) {
      return SORTERS.A_BEFORE;
    }

    return SORTERS.KEEP;
  },
  DESC: (a, b) => {
    if (b.name > a.name) {
      return SORTERS.B_BEFORE;
    }

    if (a.name > b.name) {
      return SORTERS.A_BEFORE;
    }

    return SORTERS.KEEP;
  },
};

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
  const [orderPlanets, setOrderPlanets] = useState({ func: SORT_ALPHABETICALLY.ASC });

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
      const sorted = results.sort(orderPlanets.func);
      setPlanets([...sorted.sort(orderPlanets.func)]);
      return;
    }

    const filterFuncs = filters.map(({ filterFunc }) => filterFunc);
    const filtrdPlanets = results.filter((planet) => combineFilters(filterFuncs)(planet));
    const sortedPlanets = filtrdPlanets.sort((orderPlanets.func));
    setPlanets([...sortedPlanets]);
  }, [apiResponse, filters, orderPlanets]);

  function addFilter(filter) {
    setFilters((previous) => {
      if (previous.find(({ type }) => type === filter.type)) {
        return [...previous.filter(({ type }) => type !== filter.type), filter];
      }

      return [...previous, filter];
    });
  }

  function removeFilter(type) {
    setFilters((previous) => previous.filter((filter) => filter.type !== type));
  }

  function changeOrder({ field, order }) {
    const nameSorters = {
      ASC: SORT_ALPHABETICALLY.ASC,
      DESC: SORT_ALPHABETICALLY.DESC,
    };

    const numericSorters = {
      ASC: { func: (a, b) => a[field] - b[field] },
      DESC: { func: (a, b) => b[field] - a[field] },
    };

    if (field === 'name') {
      setOrderPlanets(nameSorters[order]);
      return;
    }

    setOrderPlanets(numericSorters[order]);
  }

  return (
    <PlanetContext.Provider
      value={ {
        loading,
        error,
        apiResponse,
        planets,
        addFilter,
        removeFilter,
        filters,
        changeOrder,
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

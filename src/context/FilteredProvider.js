import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilteredContext from './FilteredContext';

function FilteredProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch('http://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => data);
      setPlanets(results);
    };
    getPlanets();
  }, []);

  const contexValue = {
    planets,
    setPlanets,
    filters,
    setFilters,
  };

  return (
    <main>
      <FilteredContext.Provider value={ contexValue }>
        { children }
      </FilteredContext.Provider>
    </main>
  );
}

FilteredProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FilteredProvider;

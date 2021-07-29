import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState(undefined);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState([]);

  const filtersByName = (text) => {
    const filterPlanets = planets.results.filter(({ name }) => (
      name.toLowerCase().includes(text.toLowerCase())
    ));
    setFilteredPlanets(filterPlanets);
  };

  const getPlanets = (Planets) => {
    setPlanets(Planets);
  };

  const getFilter = (filterType) => {
    setFilters(filterType);
  };

  return (
    <main>
      <Context.Provider
        value={ { planets,
          getPlanets,
          filters,
          getFilter,
          filtersByName,
          filteredPlanets } }
      >
        {children}
      </Context.Provider>
    </main>

  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlanetsProvider;

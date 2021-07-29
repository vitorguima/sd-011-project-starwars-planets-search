import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import MockApiData from '../Components/mock';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const filtersByName = (text) => {
    const filterPlanets = MockApiData.results.filter(({ name }) => (
      name.toLowerCase().includes(text.toLowerCase())
    ));
    setFilteredPlanets(filterPlanets);
  };

  const getPlanets = (Planets) => {
    setPlanets(Planets);
  };

  const [filters, setFilters] = useState([]);
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

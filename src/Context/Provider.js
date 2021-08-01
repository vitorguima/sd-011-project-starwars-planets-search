import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import MockApiData from '../Components/mock';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const getFilter = (filterType) => {
    setFilters(filterType);
  };

  const filtersByName = (text) => {
    const filterPlanets = planets.filter(({ name }) => (
      name.toLowerCase().includes(text.toLowerCase())
    ));
    setFilteredPlanets(filterPlanets);
  };

  const getPlanets = (Planets) => {
    setPlanets(Planets);
  };

  return (
    <main>
      <Context.Provider
        value={ { planets,
          getPlanets,
          filters,
          getFilter,
          filtersByName,
          filteredPlanets,
          setFilteredPlanets,
        } }
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

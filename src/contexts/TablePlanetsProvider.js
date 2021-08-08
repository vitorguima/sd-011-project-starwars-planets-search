import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TablePlanetsContext from './TablePlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

export default function TablePlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  const filterbyInput = (event) => {
    setFilter({
      ...filter,
      filterByName: {
        name: event.target.value,
      },
    });
  };

  useEffect(() => {
    setFiltered(planets.filter((planet) => planet.name.toLowerCase()
      .includes(filter.filterByName.name)));
  }, [filter, planets]);

  useEffect(() => {
    const PlanetsResult = async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
    };
    PlanetsResult();
  }, []);

  const context = {
    planets,
    filterbyInput,
    filtered,
  };

  return (
    <TablePlanetsContext.Provider value={ { ...context } }>
      { children }
    </TablePlanetsContext.Provider>
  );
}

TablePlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

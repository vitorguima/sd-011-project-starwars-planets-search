import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TablePlanetsContext from './TablePlanetsContext';

export default function TablePlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterbyNumericValues: [],
  });

  // const handleChangeByName = (event) => {
  //   setFilter({
  //     ...filter,
  //     filterByName: {
  //       name: event.target.value.toUpperCase(),
  //     },
  //   });
  // };

  // const filterResultbyName = (() => {

  // });

  // useEffect(() => {
  //   setFiltered(planets.filter((planet) => (planet.name.toUpperCase()
  //     .includes(filter.filterByName.name))));
  // }, [filter.filterByName.name, planets]);

  // useEffect(() => {
  //   const PlanetsResult = async () => {
  //     const { results } = await fetchPlanets();
  //     setPlanets(results);
  //   };
  //   PlanetsResult();
  // }, []);

  // const addFilter = (comparison, column, value) => {
  //   setFilter({
  //     ...filter,
  //     filterbyNumericValues: [
  //       ...filter.filterbyNumericValues,
  //       {
  //         comparison,
  //         column,
  //         value,
  //       },
  //     ],
  //   });
  // };

  const context = {
    planets,
    setPlanets,
    // handleChangeByName,
    setFilter,
    // addFilter,
    filter,
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

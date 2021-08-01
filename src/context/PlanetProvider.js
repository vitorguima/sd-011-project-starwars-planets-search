import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/fetchPlanets';
import MyContext from './MyContext';

const PlanetProvider = ({ children }) => {
  const initialState = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialState);
  const [filteredPlanets, setFilteredPlanets] = useState([]); // Planetas filtrados pelo nome.

  // function handleChange() {
  //   const filteredNameInput = data.filter(
  //     (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
  //   );
  //   setFilteredPlanets(filteredNameInput);
  // }

  useEffect(() => {
    const fetchPlanets = async () => {
      const results = await getPlanets();
      // setFilteredPlanets(results);
      setData(results);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const handlePlanets = () => {
      const planetFilteredName = data
        .filter((planet) => planet.name.includes(filters.filterByName.name));

      if (filters.filterByNumericValues.length === 0) {
        setFilteredPlanets(planetFilteredName);
      } else {
        const { filterByNumericValues } = filters;
        const { column, comparison, value } = filterByNumericValues[0];
        const planetFilterNumber = planetFilteredName.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[`${column}`]) > Number(value);
          } if (comparison === 'igual a') {
            return Number(planet[`${column}`]) === Number(value);
          }
          return Number(planet[`${column}`]) < Number(value);
        });
        setFilteredPlanets(planetFilterNumber);
      }
    };
    handlePlanets();
  },
  [data,
    filters.filterByName.name,
    filters.filterByNumericValues,
    filters, setFilteredPlanets]); // Ajuda do colega Maran.

  const context = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;

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

  function handleChange() {
    const filteredNameInput = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    setFilteredPlanets(filteredNameInput);
  }

  useEffect(() => {
    const fetchPlanets = async () => {
      const results = await getPlanets();
      setFilteredPlanets(results);
      setData(results);
    };
    fetchPlanets();
  }, []);

  useEffect(handleChange, [filters]); // Ajuda do Diegão com a sintaxe. Não precisa de colocar a HandleChange em callback, da pra chama-la diretamente.

  const context = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
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

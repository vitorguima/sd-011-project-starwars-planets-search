import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // Controle O que vem da API
  const [data, setData] = useState([]);
  // Controle Planetas filtrados
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  // Altera Filtro - Input Campo Nome, adição e remoção de filtros numérico
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  // ComponentDidMount
  useEffect(() => {
    const fetchPlanets = async () => {
      const fetchAPI = fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await fetchAPI;
      const { results } = await response.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  // Atualizações de data ou do filtro de texto
  useEffect(() => {
    const filterPlanets = data.filter((planet) => planet.name
      .includes(filters.filterByName.name));
    setFilteredPlanets(filterPlanets);
  }, [data, filters]);

  return (
    <Context.Provider
      value={ {
        filters,
        filteredPlanets,
        setFilters,
      } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;

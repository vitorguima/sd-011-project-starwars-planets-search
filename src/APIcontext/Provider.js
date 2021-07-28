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
  // Controle de colunas utilizadas
  const [listColumns, setListColumns] = useState([]);

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
    if (filters.filterByNumericValues.length > 0
      && filters.filterByNumericValues !== undefined) {
      filters.filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] > filter.value));
          break;
        case 'menor que':
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] < +filter.value));
          break;
        case 'igual a':
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] === +filter.value));
          break;
        default:
          break;
        }
      });
    } else {
      setFilteredPlanets(filterPlanets);
    }
  }, [data, filters]);

  return (
    <Context.Provider
      value={ {
        filters,
        filteredPlanets,
        setFilters,
        listColumns,
        setListColumns,
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

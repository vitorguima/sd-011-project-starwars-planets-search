import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIContext';

function APIProvider({ children }) {
  // Dados salvos da API de planetas
  const [data, setData] = useState([]);
  // Cria state para salvar só os filtros
  const [filters, setFilters] = useState(
    { filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    },
  );

  // Cria state para salvar planetas filtrados
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const filterData = ({ target }) => {
    const { value } = target;
    const searchPlanetFiltered = data.filter((planet) => planet.name.includes(value));
    setFilteredPlanets(searchPlanetFiltered);
  };

  useEffect(() => {
    const fetchAPIPlanets = async () => {
      const fetchAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanets = await fetchAPI.json();
      setData(dataPlanets.results);
      setFilteredPlanets(dataPlanets.results);
    };
    fetchAPIPlanets();
  }, []);

  const contextValue = {
    data,
    filteredPlanets,
    filters,
    setFilters,
    filterData,
  };

  return (
    <div>
      <APIContext.Provider value={ contextValue }>
        { children }
      </APIContext.Provider>
    </div>
  );
}

APIProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default APIProvider;

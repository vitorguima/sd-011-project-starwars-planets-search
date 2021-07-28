import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import swApi from '../services/swApi';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: '',
      value: '0',
    },
  ],
  });
  const [dataPlanets, setPlanetsResults] = useState([]);

  // Pega os dados da Api e modifica o state adicionando os planetas
  async function fetchPlanets() {
    const setPlanetsApi = await swApi();
    setData(setPlanetsApi);
    setPlanetsResults(setPlanetsApi.results);
  }

  // Busca os dados antes de a tela ser renderizada
  useEffect(() => {
    fetchPlanets();
  }, []);

  // Filtra pelos dados que vem do input
  function filterForNamePlanet() {
    if (dataPlanets) {
      const { name } = filters.filterByName;
      const newResults = dataPlanets.filter((item) => item.name.toLowerCase()
        .includes(name.toLowerCase()));
      return newResults;
    }
  }

  // Filtra pelas palavras e retorna cheio ou pelos
  function filterReturn() {
    if (filterForNamePlanet().length > 0) {
      return filterForNamePlanet();
    }
    return data.results;
  }

  const context = {
    filterReturn,
    filters,
    setFilters,
    dataPlanets,
  };

  return (
    <div>
      <PlanetsContext.Provider value={ context }>
        { children }
      </PlanetsContext.Provider>
    </div>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

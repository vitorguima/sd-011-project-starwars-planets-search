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
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  ],
  });
  const [dataPlanets, setPlanetsResults] = useState([]);
  const [datafilter, setfilter] = useState([]);

  // Pega os dados da Api e modifica o state adicionando os planetas
  async function fetchPlanets() {
    const setPlanetsApi = await swApi();
    setData(setPlanetsApi);
    setPlanetsResults(setPlanetsApi.results);
    setfilter(setPlanetsApi.results);
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

  function filterPerTerms() {
    if (datafilter.length > 0) {
      const { column, comparison, value } = filters.filterByNumericValues[0];
      console.log(comparison);
      switch (comparison) {
      case 'maior que':
      {
        const filterForBig = datafilter.filter((item) => parseInt(item[column], 0)
          > value);
        return filterForBig;
      }
      case 'menor que':
      {
        const filterForSmall = datafilter.filter((item) => parseInt(item[column], 0)
          < value);
        return filterForSmall;
      }
      case 'igual a':
      {
        const filterForIgual = datafilter
          .filter((item) => ('item', parseInt(item[column], 0)) === value);
        return filterForIgual;
      }
      default:
        return 0;
      }
    }
  }

  console.log(filterPerTerms());

  // Filtra pelas palavras e retorna cheio ou pelos
  function filterReturn() {
    if (filterForNamePlanet().length > 0) {
      return filterForNamePlanet();
    }
    if (filterPerTerms()) {
      console.log('entrei aqui');
      return filterPerTerms();
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

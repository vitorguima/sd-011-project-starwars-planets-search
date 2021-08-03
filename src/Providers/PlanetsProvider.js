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
      value: 0,
    },
  ],
  });
  const [dataPlanets, setPlanetsResults] = useState([]);
  const [dataResults, setResults] = useState([]);

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
  function filterForNamePlanet(filter) {
    // Ajuda de Leonardo Funabashi para entender implementar essa parte
    const { name } = filters.filterByName;
    const newResults = dataPlanets.filter((item) => item.name.toLowerCase()
      .includes(name.toLowerCase()));

    let filterByName = newResults;
    if (filter === 1) {
      const { column, comparison, value } = filters.filterByNumericValues[0];
      switch (comparison) {
      case 'maior que':
        {
          const filterForBig = filterByName.filter((item) => parseInt(item[column], 0)
          > Number(value));
          filterByName = filterForBig;
        } break;
      case 'menor que':
        {
          const filterForSmall = filterByName.filter((item) => parseInt(item[column], 0)
          < Number(value));
          filterByName = filterForSmall;
        } break;
      case 'igual a':
        {
          const filterForEqual = filterByName.filter((item) => parseInt(item[column], 0)
          === Number(value));
          filterByName = filterForEqual;
        } break;
      default:
        return console.log('Deu ruim!');
      }
    }
    setResults(filterByName);
  }

  const { column } = filters.filterByNumericValues[0];

  useEffect(() => {
    const filterUm = 1;
    filterForNamePlanet(filterUm);
  }, [column]);

  const { name } = filters.filterByName;
  useEffect(() => {
    const filterZero = 0;
    filterForNamePlanet(filterZero);
  }, [name]);

  function filterFunc() {
    if (dataResults.length > 0) {
      return dataResults;
    }
    return data.results;
  }

  const context = {
    filterFunc,
    filters,
    setFilters,
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

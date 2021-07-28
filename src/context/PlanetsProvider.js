import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';
import { filteredPlanetsByName, filteredPlanets } from '../helpers/filteredPlanets';
import selectorOptions from '../helpers/selectOptions';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(selectorOptions);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const setNameFilter = (name) => {
    setFilter({
      ...filters,
      filterByName: {
        name,
      },
    });
  };

  const setSelectFilter = ({ column, comparison, value }) => {
    const { filterByNumericValues } = filters;
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  // Função para pegar os dados da API e salvar no estado
  async function fetchStarWarsPlanets() {
    setIsLoading(true);
    try {
      const getPlanetsResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const getPlanetsResult = await getPlanetsResponse.json();
      setData(getPlanetsResult.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Esse useEffect pega os dados da API e salva no state
  useEffect(() => {
    fetchStarWarsPlanets();
  }, []);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length > 0) {
      let newOptionsList = options;
      const optionsToExclude = filterByNumericValues.map((item) => item.column);
      optionsToExclude.forEach((option) => {
        newOptionsList = newOptionsList.filter((item) => item !== option);
      });
      setOptions(newOptionsList);
    }
  }, [filters]);

  // Esse useEffect filtra os planetas de acordo com o nome e filtros numéricos
  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length === 0) {
      const newData = filteredPlanetsByName(data, filters);
      setFilteredData(newData);
    } else {
      const planetsWithFilter = filteredPlanets(filteredData, filterByNumericValues);
      setFilteredData(planetsWithFilter);
    }
  }, [data, filters]);

  return (
    <planetsContext.Provider
      value={ {
        fetchStarWarsPlanets,
        isLoading,
        filters,
        options,
        setNameFilter,
        setSelectFilter,
        filteredData } }
    >
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

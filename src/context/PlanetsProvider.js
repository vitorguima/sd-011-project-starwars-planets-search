import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';
import { filteredPlanetsByName, filteredPlanets } from '../helpers/filteredPlanets';
import removeFilter from '../helpers/removeFilter';
import selectorOptions from '../helpers/selectOptions';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(selectorOptions);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  // Função para filtrar quando usuário digita no campo de nome
  const setNameFilter = (name) => {
    setFilter({
      ...filters,
      filterByName: {
        name,
      },
    });
  };

  // Função para adicionar os filtros de coluna
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

  // Função para remover os filtros
  const getNameToRemoveFilter = (filterToRemove) => {
    const { filterByNumericValues } = filters;
    const newFilterList = removeFilter(filterToRemove, filterByNumericValues);
    setFilter({
      ...filters,
      filterByNumericValues: newFilterList,
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

  // Esse useEffect atualiza a lista de filtros no dropdown menu
  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length !== 0) {
      let newOptionsList = selectorOptions;
      const optionsToExclude = filterByNumericValues.map((item) => item.column);
      optionsToExclude.forEach((option) => {
        newOptionsList = newOptionsList.filter((item) => item !== option);
      });
      setOptions(newOptionsList);
      setFilteredOptions(optionsToExclude);
    } else {
      setOptions(selectorOptions);
      setFilteredOptions([]);
    }
  }, [filters]);

  // Esse useEffect filtra os planetas de acordo com o nome e filtros numéricos
  useEffect(() => {
    const { filterByName, filterByNumericValues } = filters;
    if (filterByName.name === '' && filterByNumericValues.length === 0) {
      const newData = data;
      setFilteredData(newData);
    } else if (filterByName.name.length !== 0) {
      const planetsWithNameFilter = filteredPlanetsByName(filteredData, filters);
      setFilteredData(planetsWithNameFilter);
    } else if (filterByNumericValues.length !== 0) {
      const checkNameFilter = filteredPlanetsByName(data, filters);
      const planetsWithNumericFilter = filteredPlanets(
        checkNameFilter, filterByNumericValues,
      );
      setFilteredData(planetsWithNumericFilter);
    }
  }, [data, filters]);

  return (
    <planetsContext.Provider
      value={ {
        fetchStarWarsPlanets,
        isLoading,
        filters,
        options,
        filteredOptions,
        setNameFilter,
        setSelectFilter,
        getNameToRemoveFilter,
        filteredData } }
    >
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

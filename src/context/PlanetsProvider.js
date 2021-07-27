import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';
import { filteredPlanetsByName, filteredPlanets } from '../helpers/filteredPlanets';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setFilter({
      ...filters,
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

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

  useEffect(() => {
    fetchStarWarsPlanets();
  }, []);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length === 0) {
      const newData = filteredPlanetsByName(data, filters);
      setFilteredData(newData);
    } else {
      const planetsWithFilter = filteredPlanets(filteredData, filterByNumericValues);
      setFilteredData(...planetsWithFilter);
    }
  }, [data, filters]);

  return (
    <planetsContext.Provider
      value={ {
        fetchStarWarsPlanets,
        isLoading,
        filters,
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

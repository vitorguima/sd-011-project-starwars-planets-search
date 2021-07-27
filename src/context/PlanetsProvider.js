import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';
import filteredPlanets from '../helpers/filteredPlanets';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },

  });

  const setNameFilter = (name) => {
    setGlobalFilter({
      filters: {
        filterByName: {
          name,
        },
      },
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
    const newData = filteredPlanets(data, globalFilter);
    setFilteredData(newData);
  }, [data, globalFilter]);

  return (
    <planetsContext.Provider
      value={ {
        fetchStarWarsPlanets,
        isLoading,
        globalFilter,
        setNameFilter,
        filteredData } }
    >
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

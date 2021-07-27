import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from './services';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [Filtredplanets, setFiltredPlanets] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    const setApiToState = async () => {
      setIsloading(true);
      try {
        const data = await fetchApi();
        setPlanets(data);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log(error.message);
      }
    };
    setApiToState();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  useEffect(() => {
    const { filterByName: { name } } = filters;
    if (name) {
      setFiltredPlanets(planets.filter(
        (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
      ));
    } else {
      setFiltredPlanets(planets);
    }
  }, [filters, filters.filterByName.name, planets]);

  return (
    <AppContext.Provider
      value={ {
        Filtredplanets,
        handleChange,
        isLoading,
        name: filters.filterByName.name,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => (useContext(AppContext));

export { AppContext, AppProvider };

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

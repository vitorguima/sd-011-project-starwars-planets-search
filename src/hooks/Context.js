import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../service/Api';

const Context = createContext();

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [Filtredplanets, setFiltredPlanets] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [filterComparison, setFilterComparison] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const handleChangeInputs = ({ target }) => {
    const { value, name } = target;
    setFilterComparison({ ...filterComparison, [name]: value });
  };

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
    <Context.Provider
      value={ {
        handleChangeInputs,
        filterComparison,
        planets,
        Filtredplanets,
        handleChange,
        isLoading,
        name: filters.filterByName.name,
      } }
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => (useContext(Context));

export { Context, Provider };

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

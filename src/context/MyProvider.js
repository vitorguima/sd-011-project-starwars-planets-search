import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchApi from '../Services/api';

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });
  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await fetchApi();
      const list = planetsList.results.map((residents) => {
        delete residents.residents;
        return residents;
      });
      setPlanetsFilter(list);
      setPlanets(list);
      console.log(planetsList);
    };
    getPlanetsList();
  }, []);

  useEffect(() => {
    if (planets) {
      const list = planets.filter((planet) => (
        planet.name.includes(filters.filterByName.name)
      ));
      console.log(list);
      setPlanetsFilter(list);
    }
  }, [filters, planets]);

  const contextValue = {
    planetsFilter,
    setFilters,
    filters,
  };

  MyProvider.propTypes = {
    children: PropTypes.func.isRequired,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

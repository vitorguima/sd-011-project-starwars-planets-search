import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Planet = createContext({});

export function Provider({ children }) {
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [data, setData] = useState();
  const [planets, setPlanets] = useState();

  function fetchData() {
    return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((obj) => obj)
      .catch((err) => err);
  }

  useEffect(() => {
    if (data) {
      const planetFilter = filters.filterByName.name;
      const { results } = data;
      const planetsToRender = results.filter(({ name }) => {
        const nameInLowerCase = name.toLowerCase();
        return (
          nameInLowerCase.includes(planetFilter)
        );
      });
      setPlanets(planetsToRender);
    }
  }, [data, filters, setPlanets]);

  useEffect(() => {
    const getData = async () => {
      const dataReceived = await fetchData();
      dataReceived.results.forEach((planet) => {
        delete planet.residents;
      });
      setData(dataReceived);
    };
    getData();
  }, []);

  const value = { data, setFilters, planets, filters, setPlanets };

  return (
    <Planet.Provider value={ value }>
      { children }
    </Planet.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

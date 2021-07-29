import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchApi from '../Services/api';

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [comparison, setComparisonFilter] = useState('maior que');
  const [column, setColumn] = useState('population');
  const [value, setValue] = useState();
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const button = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, {
        column,
        comparison,
        value,
      }],
    });
  };

  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await fetchApi();
      const list = planetsList.results.map((residents) => {
        delete residents.residents;
        return residents;
      });
      setPlanetsFilter(list);
      setPlanets(list);
      /* console.log(planetsList); */
    };
    getPlanetsList();
  }, []);

  useEffect(() => {
    if (planets) {
      const list = planets.filter((planet) => (
        planet.name.includes(filters.filterByName.name)
      ));
      const initialFilter = list.filter((filterPlanet) => {
        const { filterByNumericValues: filterNum } = filters;
        if (filterNum.length === 0) return true;
        const actualFilter = filterNum[filterNum.length - 1];
        const { column: col, comparison: comp, value: val } = actualFilter;
        switch (comp) {
        case 'maior que':
          return Number(filterPlanet[col]) > Number(val);
        case 'menor que':
          return Number(filterPlanet[col]) < Number(val);
        case 'igual a':
          return Number(filterPlanet[col]) === Number(val);
        default: return true;
        }
      });
      setPlanetsFilter(initialFilter);
    }
  }, [filters, planets]);

  const contextValue = {
    planetsFilter,
    setFilters,
    filters,
    button,
    setColumn,
    setValue,
    setComparisonFilter,
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

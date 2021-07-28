import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, SetFiltersName] = useState({ filterByName: { name: '' } });
  const [filterData, setFilterData] = useState([]);
  const [options, setOptions] = useState({
    collum: 'population',
    comparison: 'maior que',
    value: '',
  });
  // state, setState()

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((datas) => datas.json());
      setData(results);
      setFilterData(results);
    };

    getPlanets();
  }, []);

  const filterOptions = (event) => {
    const { name, value } = event.target;
    if (name === 'collum') {
      setOptions({ ...options, collum: value });
    } else if (name === 'comparison') {
      setOptions({ ...options, comparison: value });
    } else {
      setOptions({ ...options, value });
    }
  };

  const filterNumbers = () => {
    const { collum, comparison, value } = options;
    const newFilter = filterData.filter(
      (planet) => {
        if (comparison === 'maior que') {
          return (parseInt(planet[collum], 10) > parseInt(value, 10));
        }
        if (comparison === 'menor que') {
          return (parseInt(planet[collum], 10) < parseInt(value, 10));
        }
        if (comparison === 'igual a') {
          return (parseInt(planet[collum], 10) === parseInt(value, 10));
        }
        return filterData;
      },
    );
    setFilterData(newFilter);
  };

  return (
    <context.Provider
      value={ { filterData,
        filters,
        SetFiltersName,
        setFilterData,
        data,
        filterNumbers,
        filterOptions } }
    >
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

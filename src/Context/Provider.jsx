import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, getName] = useState('');
  const [filterByName, getFilterByName] = useState({ name });
  const [filters, getFilters] = useState({ filterByName });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint)
        .then((receivedData) => receivedData.json());
      const filteredResults = Object.values(results);
      filteredResults.map((test) => {
        test.residents.splice(0, test.residents.length);
        return test;
      });

      if (name.length === 0) setData(filteredResults);

      if (name.length !== 0) {
        const filterData = filteredResults.filter((element) => element.name
          .toLowerCase().includes(name.toLowerCase()));
        setData(filterData);
      }
    };

    getPlanets();
  }, [name]);

  const obj = {
    data,
    setData,
    name,
    getName,
    filterByName,
    getFilterByName,
    filters,
    getFilters,
  };
  return (
    <PlanetsContext.Provider value={ obj }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;

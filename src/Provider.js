import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import AppContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const getStar = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((dataApi) => dataApi.json());
      setData(results);
      setFilterData(results);
    };
    getStar();
  }, []);

  function handleChange({ target }) {
    setFilters(target.value.toLowerCase());
    const newData = data.filter(
      (planet) => planet.name.toLowerCase().includes(target.value),
    );
    setFilterData(
      newData,
    );
  }

  return (
    <div>
      <AppContext.Provider value={ { filterData, setFilterData, handleChange, filters } }>
        { children }
      </AppContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

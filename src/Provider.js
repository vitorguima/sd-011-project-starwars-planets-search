import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, SetFiltersName] = useState({ filterByName: { name: '' } });
  const [filterData, setFilterData] = useState([]);
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

  return (
    <context.Provider
      value={ { filterData, filters, SetFiltersName, setFilterData, data } }
    >
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

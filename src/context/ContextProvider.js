import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import API from '../services/API';

const initialFilter = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: '',
      value: '',
    },
  ],
};

export default function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(initialFilter);

  async function fetchData() {
    const arrayPlanets = await API();
    setData(arrayPlanets);
    setPlanets(arrayPlanets);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const stateGlobal = { data, planets, setPlanets, filters, setFilters };

  return (
    <Context.Provider value={ stateGlobal }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

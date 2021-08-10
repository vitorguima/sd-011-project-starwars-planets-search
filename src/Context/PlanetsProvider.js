import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../Services/api';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filtered, setFiltered] = useState(data);
  const [filterNumeric, setFilterNumeric] = useState([]);
  const [filterSort, setFilterSort] = useState({ column: 'name', sort: 'ASC' });

  const getApi = () => {
    fetchPlanets().then((response) => setData(response));
  };
  useEffect(getApi, []);

  const context = {
    data,
    setData,
    setName,
    setFilterNumeric,
    setFilterSort,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filterNumeric,
      order: filterSort,
    },
    filtered,
    setFiltered,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>

  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Provider = ({ children }) => {
  const [data, setPlanets] = useState([]);
  const [toRender, setToRender] = useState([]);
  const [objectKeys, setObjectKeys] = useState();
  const [loadingStatus, changeLoadingStatus] = useState(true);
  const [exceptions, setExceptions] = useState([]);
  const [filters, setFilters] = useState({
    inputText: '',
    columnFilter: '',
    comparissionFilter: '',
    value: '',
  });

  const getPlanetsData = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const { results } = await fetch(endpoint).then((value) => value.json());
    setPlanets(results);
    setToRender(results);
    delete results[0].residents;
    const renderKeys = Object.keys(results[0]);
    setObjectKeys(renderKeys);
    changeLoadingStatus(false);
  };

  useEffect(() => {
    getPlanetsData();
  }, []);

  const context = {
    getPlanetsData,
    data,
    setPlanets,
    toRender,
    setToRender,
    objectKeys,
    loadingStatus,
    changeLoadingStatus,
    exceptions,
    setExceptions,
    setFilters,
    filters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

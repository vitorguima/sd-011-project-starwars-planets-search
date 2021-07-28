import React, { useState } from 'react';
import PlanetsContext from './PlanetsContext';
// import testData from '../testData';

const Provider = ({ children }) => {
  const [data, setPlanets] = useState([]);
  const [toRender, setToRender] = useState([]);
  const [objectKeys, setObjectKeys] = useState();
  const [loadingStatus, changeLoadingStatus] = useState(true);
  const [filters, setFilters] = useState({
    inputText: '',
    columnFilter: '',
    comparissionFilter: '',
    value: '',
  });

  const getPlanetsData = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const { results } = await fetch(endpoint).then((value) => value.json());
    // const { results } = testData;
    setPlanets(results);
    setToRender(results);
    delete results[0].residents;
    const renderKeys = Object.keys(results[0]);
    setObjectKeys(renderKeys);
    changeLoadingStatus(false);
    // console.log(results)
  };

  const context = {
    getPlanetsData,
    data,
    setPlanets,
    toRender,
    setToRender,
    objectKeys,
    loadingStatus,
    changeLoadingStatus,
    setFilters,
    filters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

export default Provider;

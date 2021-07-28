import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanets } from '../services/data';

function PlanetsProvider({ children }) {
  const [dataApi, setDataApi] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [err, setErr] = useState(undefined);
  const [filterUpdated, setFilterUpdated] = useState([
    { filterByName: {} },
  ]);

  const handleContextApi = ({ results }) => {
    setDataApi(results);
    setFilterPlanet(results);
  };

  const handleError = ({ message }) => {
    setErr(message);
  };

  const planetsData = async () => {
    try {
      const dataJson = await getPlanets();
      handleContextApi(dataJson);
    } catch (errMsg) {
      handleError(errMsg);
    }
  };

  const filterByName = (newFilter) => {
    const gettingFilter = filterUpdated;
    console.log('newFilter', newFilter);
    console.log('filterUpdated', filterUpdated);
    gettingFilter[0] = {
      filterByName: { newFilter },
    };
    console.log(gettingFilter[0]);
    setFilterUpdated(gettingFilter);
    const returnNewList = dataApi.filter((e) => e.name.toLowerCase()
      .includes(newFilter.toLowerCase()));
    console.log('returnNewList', returnNewList);
    setFilterPlanet(returnNewList);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planetsData,
        filterPlanet,
        err,
        filterByName,
        setFilterPlanet,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;

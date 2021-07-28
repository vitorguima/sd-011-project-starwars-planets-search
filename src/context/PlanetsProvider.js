import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanets } from '../services/data';

function PlanetsProvider({ children }) {
  const [dataApi, setDataApi] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [err, setErr] = useState(undefined);
  const [filterUpdated, setFilterUpdated] = useState([
    { filterByName: {} },
    { filterByNumericValues: [] },
  ]);

  const handleContextApi = ({ results }) => {
    setDataApi(results);
    setFilterPlanet(results);
  };

  const handleError = ({ message }) => {
    setErr(message);
  };

  useEffect(() => {
    const planetsData = async () => {
      try {
        const dataJson = await getPlanets();
        handleContextApi(dataJson);
      } catch (errMsg) {
        handleError(errMsg);
      }
    };

    planetsData();
  }, []);

  const filterByName = (newFilter) => {
    const gettingFilter = filterUpdated;
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

  const filteringByParams = () => {
    const { filterByNumericValues } = filterUpdated[1];
    let api = dataApi;
    console.log(filterByNumericValues);
    filterByNumericValues.forEach((e) => {
      api = api.filter((apiNumeric) => {
        if (e.comparison === 'maior que') {
          console.log(apiNumeric[e.column]);
          return (
            parseInt(apiNumeric[e.column], 10) > parseInt(e.value, 10)
          );
        }
        if (e.comparison === 'menor que') {
          return (
            parseInt(apiNumeric[e.column], 10) < parseInt(e.value, 10)
          );
        }
        if (e.comparison === 'igual a') {
          return (
            parseInt(apiNumeric[e.column], 10) === parseInt(e.value, 10)
          );
        }
        return null;
      });
    });
    setFilterPlanet(api);
    console.log(api);
  };

  const filterByNumericValues = (newFeatures) => {
    const gettingFilter = filterUpdated;
    console.log('newFeatures', newFeatures);
    gettingFilter[1].filterByNumericValues.push(newFeatures);
    // setFilterPlanet(gettingFilter[1]);
    console.log('filterByNumericValues', gettingFilter[1].filterByNumericValues);
    filteringByParams();
  };

  return (
    <PlanetsContext.Provider
      value={ {
        filterPlanet,
        err,
        filterByName,
        setFilterPlanet,
        filterByNumericValues,
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

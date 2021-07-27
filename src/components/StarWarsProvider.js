/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsApi from '../services/StarWarsPlanetApi';

function StarWarsProvider(props) {
  const [data, setData] = useState([]);

  async function importData() {
    const getData = await fetchPlanetsApi();
    setData(getData);
  }
  useEffect(() => {
    importData();
  }, []);

  const { children } = props;
  return (
    <StarWarsContext.Provider value={ { data } }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

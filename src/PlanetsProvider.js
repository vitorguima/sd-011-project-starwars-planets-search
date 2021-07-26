import React, { useState } from 'react';
import PlanetsContext from './PlanetsContext';
const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const fetchData = () => fetch(url)
  .then((result) => result.json())
  .then((data) => setData(data.results))

  const contextValue = {
    data,
    fetchData,
  };

  return (
    <PlanetsContext.Provider value={contextValue}>
      {children}
    </PlanetsContext.Provider>
  );
}

export default Provider;
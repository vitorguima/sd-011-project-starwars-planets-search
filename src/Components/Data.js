import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import Table from './Table';

function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);
  const contextValue = {
    // planet: requestData,
  };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      <Table dataForTable={ data } />
    </PlanetsContext.Provider>
  );
}

export default Data;

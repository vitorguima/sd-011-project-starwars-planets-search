import React from 'react';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/data';

function PlanetsProvider(children) {
  const planetsData = async () => {
    const dataJson = await getPlanets().then((resolve) => resolve.results);
    return dataJson;
  };

  return (
    <PlanetsContext.Provider planets={ planetsData }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

import React, { useContext, useEffect } from 'react';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function MainPage() {
  const { isLoading, fetchStarwarsPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchStarwarsPlanets();
  }, []);

  if (isLoading) {
    return (
      <div>LOADING...</div>
    );
  }
  return (
    <div>
      <Table />
    </div>
  );
}

export default MainPage;

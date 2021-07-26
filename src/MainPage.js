import React, { useContext, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import SelectionFilter from './components/SelectionFilters';
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
      <SearchInput />
      <Table />
      <SelectionFilter />
    </div>
  );
}

export default MainPage;

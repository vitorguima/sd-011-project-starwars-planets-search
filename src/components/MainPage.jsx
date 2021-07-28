import React, { useContext, useEffect } from 'react';
import Table from './Table';
import GlobalContext from '../context/GlobalContext';
import SearchInput from './SearchInput';
import NumericFilters from './NumericFilters';

function MainPage() {
  const { loading, fetchPlanets } = useContext(GlobalContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <div>LOADING...</div>
    );
  }
  return (
    <div className="table-container">
      <SearchInput />
      <NumericFilters />
      <Table />
    </div>
  );
}

export default MainPage;

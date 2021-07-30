import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';
import fetchPlanets from '../services/api';
import Table from './Table';
import NumFilter from './NumFilter';
import Filter from './Filter';

const Load = () => {
  const { setData, loading, setLoading } = useContext(DataContext);

  useEffect(() => {
    async function getPlanets() {
      setLoading(true);
      const planetsAPI = await fetchPlanets();
      setData(planetsAPI);
      setLoading(false);
    }
    getPlanets();
  }, []);

  return (
    <div>
      { loading ? 'loading'
        : (
          <>
            <Filter />
            <NumFilter />
            <Table />
          </>
        )}
    </div>
  );
};

export default Load;

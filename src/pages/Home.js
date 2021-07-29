import React, { useContext, useEffect } from 'react';
import AppContext from '../utils/AppContext';
import FetchPlanets from '../services';
import Table from '../components/Table';

function Home() {
  const { setPlanets } = useContext(AppContext);
  useEffect(() => {
    FetchPlanets().then((data) => setPlanets(data));
  }, [setPlanets]);
  return (
    <div>
      <Table />
    </div>
  );
}

export default Home;
